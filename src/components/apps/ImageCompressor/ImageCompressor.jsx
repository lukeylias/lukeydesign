import { useState, useRef, useCallback } from 'react';
import {
  playDrop,
  playClick,
  playToggleOn,
  playToggleOff,
  playCompress,
  playSuccess,
  playError,
} from '../../../utils/sounds';
import './ImageCompressor.css';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const MAX_SIZE = 80 * 1024 * 1024; // 80MB
const FORMAT_OPTIONS = [
  { label: 'WebP', mime: 'image/webp', ext: 'webp' },
  { label: 'JPEG', mime: 'image/jpeg', ext: 'jpg' },
  { label: 'PNG', mime: 'image/png', ext: 'png' },
];
const WIDTH_PRESETS = [1920, 1280, 800, 480];
const QUALITY = 0.82;

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageCompressor() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imgDimensions, setImgDimensions] = useState(null);
  const [format, setFormat] = useState(FORMAT_OPTIONS[0]);
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [targetWidth, setTargetWidth] = useState(WIDTH_PRESETS[0]);
  const [compressing, setCompressing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const blobRef = useRef(null);

  const reset = useCallback(() => {
    setFile(null);
    setPreview(null);
    setImgDimensions(null);
    setResult(null);
    setError(null);
    blobRef.current = null;
  }, []);

  const loadFile = useCallback((f) => {
    setError(null);
    setResult(null);
    blobRef.current = null;

    if (!ACCEPTED_TYPES.includes(f.type)) {
      playError();
      setError('Unsupported file type. Please use JPEG, PNG, WebP, or AVIF.');
      return;
    }
    if (f.size > MAX_SIZE) {
      playError();
      setError('File exceeds 80 MB limit.');
      return;
    }

    playDrop();
    setFile(f);

    const url = URL.createObjectURL(f);
    setPreview(url);

    const img = new Image();
    img.onload = () => setImgDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = url;
  }, []);

  // Drag handlers
  const onDragOver = (e) => { e.preventDefault(); setDragActive(true); };
  const onDragLeave = () => setDragActive(false);
  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) loadFile(f);
  };
  const onBrowse = () => fileInputRef.current?.click();
  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) loadFile(f);
    e.target.value = '';
  };

  // Compress
  const compress = useCallback(async () => {
    if (!file || !preview || !imgDimensions) return;
    setCompressing(true);
    playCompress();

    try {
      const img = new Image();
      img.src = preview;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (resizeEnabled && targetWidth < w) {
        const ratio = targetWidth / w;
        w = targetWidth;
        h = Math.round(h * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);

      const blob = await new Promise((res) =>
        canvas.toBlob((b) => res(b), format.mime, format.mime === 'image/png' ? undefined : QUALITY)
      );

      blobRef.current = blob;

      const pct = ((1 - blob.size / file.size) * 100).toFixed(1);

      setResult({
        originalSize: file.size,
        compressedSize: blob.size,
        percentage: pct,
        width: w,
        height: h,
        larger: blob.size >= file.size,
      });

      // Auto-download
      downloadBlob(blob);
      playSuccess();
    } catch {
      playError();
      setError('Compression failed. The browser may not support this image format.');
    } finally {
      setCompressing(false);
    }
  }, [file, preview, imgDimensions, format, resizeEnabled, targetWidth]);

  function downloadBlob(blob) {
    const baseName = file.name.replace(/\.[^.]+$/, '');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob || blobRef.current);
    a.download = `${baseName}-compressed.${format.ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // --- Render ---

  // Drop zone state
  if (!file) {
    return (
      <div className="compressor">
        {error && (
          <div className="compressor__error">
            <span>{error}</span>
            <button className="compressor__error-dismiss" onClick={() => setError(null)}>×</button>
          </div>
        )}
        <div
          className={`compressor__dropzone ${dragActive ? 'compressor__dropzone--active' : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={onBrowse}
        >
          <span className="compressor__dropzone-icon">📁</span>
          <span className="compressor__dropzone-text">Drop an image here or click to browse</span>
          <span className="compressor__dropzone-hint">JPEG, PNG, WebP, AVIF — up to 80 MB</span>
        </div>
        <input
          ref={fileInputRef}
          className="compressor__file-input"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={onFileChange}
        />
      </div>
    );
  }

  return (
    <div className="compressor">
      {error && (
        <div className="compressor__error">
          <span>{error}</span>
          <button className="compressor__error-dismiss" onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Preview */}
      <div className="compressor__preview">
        <img className="compressor__preview-image" src={preview} alt="Preview" />
        <span className="compressor__file-info">
          {file.name} — {formatBytes(file.size)}
          {imgDimensions && ` — ${imgDimensions.width}×${imgDimensions.height}`}
        </span>
      </div>

      {/* Controls */}
      {!result && (
        <div className="compressor__controls">
          {/* Format */}
          <p className="compressor__section-label">Output format</p>
          <div className="compressor__formats">
            {FORMAT_OPTIONS.map((f) => (
              <button
                key={f.mime}
                className={`compressor__format-btn ${f.mime === format.mime ? 'compressor__format-btn--active' : ''}`}
                onClick={() => { playClick(); setFormat(f); }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Resize */}
          <div className="compressor__resize-row">
            <button
              className={`compressor__toggle ${resizeEnabled ? 'compressor__toggle--on' : ''}`}
              onClick={() => {
                resizeEnabled ? playToggleOff() : playToggleOn();
                setResizeEnabled(!resizeEnabled);
              }}
              aria-pressed={resizeEnabled}
              aria-label="Toggle resize"
            >
              <span className="compressor__toggle-thumb" />
            </button>
            <span className="compressor__section-label">Resize</span>
          </div>

          {resizeEnabled && (
            <div className="compressor__widths">
              {WIDTH_PRESETS.map((w) => (
                <button
                  key={w}
                  className={`compressor__width-btn ${w === targetWidth ? 'compressor__width-btn--active' : ''}`}
                  onClick={() => { playClick(); setTargetWidth(w); }}
                >
                  {w}px
                </button>
              ))}
            </div>
          )}

          <button
            className="compressor__compress-btn"
            onClick={compress}
            disabled={compressing}
          >
            {compressing ? 'Compressing…' : 'Compress'}
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="compressor__result">
          <div className="compressor__meta">
            <span className="compressor__meta-item">
              <span className="compressor__meta-label">Original:</span> {formatBytes(result.originalSize)}
            </span>
            <span className="compressor__meta-item">
              <span className="compressor__meta-label">Compressed:</span> {formatBytes(result.compressedSize)}
            </span>
            <span className="compressor__meta-item">
              <span className="compressor__meta-label">Saved:</span> {result.percentage}%
            </span>
            <span className="compressor__meta-item">
              <span className="compressor__meta-label">Dimensions:</span> {result.width}×{result.height}
            </span>
          </div>
          {result.larger && (
            <p className="compressor__note">
              Output is larger than the original — this can happen with PNG or already-optimised files.
            </p>
          )}
          <div className="compressor__actions">
            <button className="compressor__action-btn" onClick={() => { playClick(); downloadBlob(blobRef.current); }}>
              Download Again
            </button>
            <button className="compressor__action-btn" onClick={() => { playClick(); reset(); }}>
              New Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

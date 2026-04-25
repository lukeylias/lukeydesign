/**
 * App registry – maps string keys to React components.
 * Micro-apps register here so the Modal can render them by key.
 */
import ImageCompressor from './ImageCompressor/ImageCompressor';

const appRegistry = {
  'image-compressor': ImageCompressor,
};

export default appRegistry;

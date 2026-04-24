import { useState, useEffect, useRef, useCallback } from 'react';
import conversationSteps, { GUIDED_SEQUENCE } from '../../data/conversationSteps';
import useSoundEngine from '../../hooks/useSoundEngine';
import './Chatbot.css';

function findStep(prompt) {
  return conversationSteps.find((s) => s.prompt === prompt) || null;
}

export default function Chatbot({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const chatLogRef = useRef(null);
  const typingCancelRef = useRef(null);

  const sound = useSoundEngine();

  const [messages, setMessages] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [composerValue, setComposerValue] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [soundOn, setSoundOn] = useState(() => localStorage.getItem('soundEnabled') !== 'false');
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [sequenceComplete, setSequenceComplete] = useState(false);

  // Track whether the initial auto-type has fired for this open session
  const hasInitTypedRef = useRef(false);

  // Sync dialog open/close
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (isOpen && !d.open) {
      d.showModal();
      if (!hasInitTypedRef.current && messages.length === 0 && welcomeVisible) {
        hasInitTypedRef.current = true;
        animateType(GUIDED_SEQUENCE[0]);
      }
    } else if (!isOpen && d.open) {
      d.close();
    }
  }, [isOpen]);

  // Prevent native ESC — parent handles it
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const h = (e) => { e.preventDefault(); onClose(); };
    d.addEventListener('cancel', h);
    return () => d.removeEventListener('cancel', h);
  }, [onClose]);

  // Scroll to bottom when messages change
  useEffect(() => {
    const el = chatLogRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  // Animated typing into composer
  const animateType = useCallback((text) => {
    if (typingCancelRef.current) typingCancelRef.current();

    let cancelled = false;
    let i = 0;
    typingCancelRef.current = () => { cancelled = true; };

    const tick = () => {
      if (cancelled) return;
      setComposerValue(text.slice(0, i + 1));
      if (i % 2 === 0) sound.playTypeTick();
      i++;
      if (i < text.length) {
        setTimeout(tick, 24);
      } else {
        typingCancelRef.current = null;
      }
    };
    setComposerValue('');
    setTimeout(tick, 200);
  }, [sound]);

  // Submit the current guided prompt
  const submitPrompt = useCallback(async (prompt) => {
    if (!prompt || isBusy) return;

    const step = findStep(prompt);
    if (!step) return;

    setIsBusy(true);
    setWelcomeVisible(false);

    setMessages((prev) => [...prev, { role: 'user', html: `<p>${prompt}</p>` }]);
    setComposerValue('');
    setIsTyping(true);

    await delay(900);

    setIsTyping(false);
    setMessages((prev) => [...prev, { role: 'assistant', html: step.response }]);

    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);

    if (nextIndex < GUIDED_SEQUENCE.length) {
      // Auto-advance after a pause
      setTimeout(() => {
        setIsBusy(false);
        animateType(GUIDED_SEQUENCE[nextIndex]);
      }, 1800);
    } else {
      setSequenceComplete(true);
      setIsBusy(false);
    }
  }, [isBusy, stepIndex, animateType]);

  const resetConversation = useCallback(() => {
    if (typingCancelRef.current) typingCancelRef.current();
    setMessages([]);
    setComposerValue('');
    setStepIndex(0);
    setWelcomeVisible(true);
    setIsBusy(false);
    setIsTyping(false);
    setSequenceComplete(false);
    hasInitTypedRef.current = true;

    setTimeout(() => animateType(GUIDED_SEQUENCE[0]), 800);
  }, [animateType]);

  const handleSoundToggle = () => {
    const nowOn = sound.toggle();
    setSoundOn(nowOn);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentPrompt = GUIDED_SEQUENCE[stepIndex];
    if (currentPrompt) submitPrompt(currentPrompt);
  };

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose();
  };

  // Delegated click handler for images in message HTML
  const handleMessageClick = useCallback((e) => {
    const img = e.target.closest('.cb-media img');
    if (img) {
      // Images in chatbot are non-interactive
      return;
    }
  }, []);

  const sendDisabled = isBusy || !composerValue.trim();

  return (
    <>
      <dialog
        ref={dialogRef}
        className="cb-dialog"
        aria-labelledby="cb-title"
        onClick={handleBackdropClick}
      >
        {/* Titlebar */}
        <div className="cb-titlebar">
          <div className="cb-titlebar__left">
            <span className="cb-titlebar__icon">💬</span>
            <span className="cb-titlebar__text" id="cb-title">Luke.exe</span>
          </div>
          <div className="cb-titlebar__controls">
            <button
              className="cb-titlebar__btn"
              aria-label={soundOn ? 'Mute sounds' : 'Unmute sounds'}
              title={soundOn ? 'Mute sounds' : 'Unmute sounds'}
              onClick={handleSoundToggle}
              type="button"
            >
              {soundOn ? '🔊' : '🔇'}
            </button>
            <button
              className="cb-titlebar__btn cb-titlebar__btn--close"
              aria-label="Close"
              title="Close"
              onClick={onClose}
              type="button"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Chat area */}
        <div className="cb-body">
          <div className="cb-chat-log" ref={chatLogRef} role="log" aria-live="polite" onClick={handleMessageClick}>
            {welcomeVisible && messages.length === 0 && (
              <div className="cb-welcome">
                <h2 className="cb-welcome__title">Hey, I'm Luke.<br />What would you like to know?</h2>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`cb-msg cb-msg--${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="cb-msg__avatar">LY</div>
                )}
                <div className={`cb-msg__bubble cb-msg__bubble--${msg.role}`}>
                  {msg.role === 'assistant' && (
                    <p className="cb-msg__label">Luke</p>
                  )}
                  <div
                    className="cb-msg__body"
                    dangerouslySetInnerHTML={{ __html: msg.html }}
                  />
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="cb-msg cb-msg--assistant">
                <div className="cb-msg__avatar">LY</div>
                <div className="cb-msg__bubble cb-msg__bubble--assistant">
                  <p className="cb-msg__label">Luke</p>
                  <div className="cb-typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Composer dock */}
          <div className="cb-dock">
            {sequenceComplete && (
              <div className="cb-end">
                <button
                  type="button"
                  className="cb-end__restart"
                  onClick={resetConversation}
                >
                  ↻ Start over
                </button>
              </div>
            )}

            <form className="cb-composer" onSubmit={handleSubmit}>
              <textarea
                className="cb-composer__input"
                rows="1"
                readOnly
                value={composerValue}
                aria-label="Selected prompt"
              />
              <button
                className="cb-composer__send"
                type="submit"
                disabled={sendDisabled}
                aria-label="Send"
              >
                ➜
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Lightbox */}
      {lightboxSrc && (
        <div className="cb-lightbox" onClick={() => setLightboxSrc(null)}>
          <img src={lightboxSrc} alt="" />
        </div>
      )}
    </>
  );
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

import { useRef, useCallback } from 'react';

/**
 * Web Audio API sound engine for the chatbot.
 * Ported from lukeysite SoundEngine IIFE, wrapped as a React hook.
 * Sound preference persisted in localStorage.
 */
export default function useSoundEngine() {
  const ctxRef = useRef(null);
  const enabledRef = useRef(localStorage.getItem('soundEnabled') !== 'false');

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  }, []);

  const playTypeTick = useCallback(() => {
    if (!enabledRef.current) return;
    const ac = getContext();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const filter = ac.createBiquadFilter();

    const baseFreqs = [1200, 1350, 1500, 1100, 1400];
    const freq = baseFreqs[Math.floor(Math.random() * baseFreqs.length)] + (Math.random() - 0.5) * 100;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, ac.currentTime + 0.04);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2000, ac.currentTime);
    filter.Q.setValueAtTime(1.5, ac.currentTime);

    gain.gain.setValueAtTime(0, ac.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ac.currentTime + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.06);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.07);
  }, [getContext]);

  const playToggleOn = useCallback(() => {
    const ac = getContext();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ac.currentTime + 0.05);
    gain.gain.setValueAtTime(0, ac.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ac.currentTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.09);
  }, [getContext]);

  const playToggleOff = useCallback(() => {
    const ac = getContext();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, ac.currentTime + 0.06);
    gain.gain.setValueAtTime(0, ac.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ac.currentTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.09);
  }, [getContext]);

  const playPopoverOpen = useCallback(() => {
    if (!enabledRef.current) return;
    const ac = getContext();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(720, ac.currentTime + 0.08);
    gain.gain.setValueAtTime(0, ac.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ac.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.11);
  }, [getContext]);

  const playPopoverClose = useCallback(() => {
    if (!enabledRef.current) return;
    const ac = getContext();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, ac.currentTime + 0.07);
    gain.gain.setValueAtTime(0, ac.currentTime);
    gain.gain.linearRampToValueAtTime(0.035, ac.currentTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.09);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.1);
  }, [getContext]);

  const toggle = useCallback(() => {
    const wasEnabled = enabledRef.current;
    if (wasEnabled) playToggleOff();
    enabledRef.current = !wasEnabled;
    localStorage.setItem('soundEnabled', enabledRef.current);
    if (enabledRef.current) playToggleOn();
    return enabledRef.current;
  }, [playToggleOff, playToggleOn]);

  const isEnabled = useCallback(() => enabledRef.current, []);

  return { playTypeTick, playToggleOn, playToggleOff, playPopoverOpen, playPopoverClose, toggle, isEnabled };
}

/**
 * Shared sound singleton – single AudioContext, global mute state.
 * Both the Chatbot and micro-apps import from here.
 */

let ctx = null;
let enabled = localStorage.getItem('soundEnabled') !== 'false';
const listeners = new Set();

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getSnapshot() {
  return enabled;
}

function getContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

export function isEnabled() {
  return enabled;
}

export function mute() {
  enabled = false;
  localStorage.setItem('soundEnabled', 'false');
  notify();
}

export function unmute() {
  enabled = true;
  localStorage.setItem('soundEnabled', 'true');
  notify();
}

// --- Chatbot sounds ---

export function playTypeTick() {
  if (!enabled) return;
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
}

export function playToggleOn() {
  if (!enabled) return;
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
}

export function playToggleOff() {
  if (!enabled) return;
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
}

export function playPopoverOpen() {
  if (!enabled) return;
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
}

export function playPopoverClose() {
  if (!enabled) return;
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
}

// --- Compressor sounds ---

export function playDrop() {
  if (!enabled) return;
  const ac = getContext();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(500, ac.currentTime + 0.06);
  gain.gain.setValueAtTime(0, ac.currentTime);
  gain.gain.linearRampToValueAtTime(0.07, ac.currentTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.1);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.11);
}

export function playClick() {
  if (!enabled) return;
  const ac = getContext();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(800, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ac.currentTime + 0.03);
  gain.gain.setValueAtTime(0, ac.currentTime);
  gain.gain.linearRampToValueAtTime(0.04, ac.currentTime + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.06);
}

export function playCompress() {
  if (!enabled) return;
  const ac = getContext();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ac.currentTime + 0.3);
  gain.gain.setValueAtTime(0, ac.currentTime);
  gain.gain.linearRampToValueAtTime(0.04, ac.currentTime + 0.01);
  gain.gain.linearRampToValueAtTime(0.04, ac.currentTime + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.35);
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1000, ac.currentTime);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.36);
}

export function playSuccess() {
  if (!enabled) return;
  const ac = getContext();
  [440, 554, 659].forEach((freq, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    const t = ac.currentTime + i * 0.08;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.06, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(t);
    osc.stop(t + 0.16);
  });
}

export function playError() {
  if (!enabled) return;
  const ac = getContext();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(200, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120, ac.currentTime + 0.15);
  gain.gain.setValueAtTime(0, ac.currentTime);
  gain.gain.linearRampToValueAtTime(0.05, ac.currentTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.21);
}

export function toggle() {
  if (enabled) {
    // Play before disabling so the sound is audible
    playToggleOff();
    enabled = false;
  } else {
    enabled = true;
    // Play after enabling so the sound is audible
    playToggleOn();
  }
  localStorage.setItem('soundEnabled', String(enabled));
  notify();
  return enabled;
}

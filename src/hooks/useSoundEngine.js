import { useSyncExternalStore } from 'react';
import {
  subscribe,
  getSnapshot,
  playTypeTick,
  playToggleOn,
  playToggleOff,
  playPopoverOpen,
  playPopoverClose,
  toggle,
} from '../utils/sounds';

/**
 * Thin React wrapper around the shared sound singleton.
 * Keeps the same API shape the Chatbot already consumes.
 */
export default function useSoundEngine() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot);

  return {
    playTypeTick,
    playToggleOn,
    playToggleOff,
    playPopoverOpen,
    playPopoverClose,
    toggle,
    isEnabled: () => enabled,
  };
}

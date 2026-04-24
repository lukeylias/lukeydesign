import { useEffect, useRef, useCallback } from 'react';

const FOCUSABLE = 'a[href], button, [tabindex]:not([tabindex="-1"])';

export default function useFocusTrap(containerRef, isActive) {
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    triggerRef.current = document.activeElement;

    const container = containerRef.current;
    const focusable = () => [...container.querySelectorAll(FOCUSABLE)];

    const first = focusable()[0];
    if (first) first.focus();

    function handleKeyDown(e) {
      if (e.key !== 'Tab') return;
      const els = focusable();
      if (!els.length) return;

      const firstEl = els[0];
      const lastEl = els[els.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      if (triggerRef.current && triggerRef.current.focus) {
        triggerRef.current.focus();
      }
    };
  }, [isActive, containerRef]);
}

import { useState, useCallback } from 'react';

export default function useLightbox() {
  const [state, setState] = useState({ isOpen: false, media: null });

  const open = useCallback((media) => {
    if (!media?.src) return;
    setState({ isOpen: true, media });
  }, []);

  const close = useCallback(() => {
    setState({ isOpen: false, media: null });
  }, []);

  return { isOpen: state.isOpen, media: state.media, open, close };
}

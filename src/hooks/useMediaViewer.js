import { useState, useCallback } from 'react';

export default function useMediaViewer() {
  const [state, setState] = useState({ isOpen: false, src: '', alt: '' });

  const open = useCallback((src, alt) => {
    setState({ isOpen: true, src, alt: alt || 'Image' });
  }, []);

  const close = useCallback(() => {
    setState({ isOpen: false, src: '', alt: '' });
  }, []);

  return { ...state, open, close };
}

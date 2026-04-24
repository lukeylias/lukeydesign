import { useState, useCallback, useRef, useEffect } from 'react';
import { findItem } from '../data';
import useHashRouter from './useHashRouter';

export default function useModal() {
  const { route, setHash, clearHash } = useHashRouter();
  const [activeItem, setActiveItem] = useState(null); // { section, item }
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const scrollYRef = useRef(0);

  const [isExpanded, setIsExpanded] = useState(false);

  const open = useCallback((item, sectionId, triggerEl) => {
    scrollYRef.current = window.scrollY;
    triggerRef.current = triggerEl || null;
    setActiveItem({ sectionId, item });
    setIsOpen(true);
    setIsExpanded(false);
    setHash(sectionId, item.slug);
    document.body.classList.add('modal-open');
  }, [setHash]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveItem(null);
    setIsExpanded(false);
    clearHash();
    document.body.classList.remove('modal-open');
    window.scrollTo(0, scrollYRef.current);
    if (triggerRef.current?.focus) {
      triggerRef.current.focus();
    }
    triggerRef.current = null;
  }, [clearHash]);

  // Handle popstate (browser back) closing the modal
  useEffect(() => {
    if (isOpen && !route) {
      // Back button pressed — route is now null
      setIsOpen(false);
      setActiveItem(null);
      document.body.classList.remove('modal-open');
      window.scrollTo(0, scrollYRef.current);
      if (triggerRef.current?.focus) {
        triggerRef.current.focus();
      }
      triggerRef.current = null;
    } else if (!isOpen && route) {
      // Deep-link or forward navigation
      const found = findItem(route.section, route.slug);
      if (found) {
        setActiveItem({ sectionId: found.section.id, item: found.item });
        setIsOpen(true);
        document.body.classList.add('modal-open');
      } else {
        console.warn(`No item found for hash: #/${route.section}/${route.slug}`);
        clearHash();
      }
    }
  }, [route]);

  return { isOpen, activeItem, isExpanded, open, close, toggleExpanded };
}

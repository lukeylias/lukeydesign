import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MobileNav from './components/MobileNav/MobileNav';
import Section from './components/Section/Section';
import Modal from './components/Modal/Modal';
import Lightbox from './components/Lightbox/Lightbox';
import Chatbot from './components/Chatbot/Chatbot';
import sections from './data';
import useModal from './hooks/useModal';
import useLightbox from './hooks/useLightbox';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/layout.css';

export default function App() {
  const modal = useModal();
  const lightbox = useLightbox();
  const [chatOpen, setChatOpen] = useState(false);

  function handleHeadlineClick(item, sectionId) {
    modal.open(item, sectionId);
  }

  function handleLightbox(media) {
    lightbox.open(media);
  }

  // Centralised ESC handler — chatbot first, then lightbox, then modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        if (chatOpen) {
          e.preventDefault();
          setChatOpen(false);
        } else if (lightbox.isOpen) {
          e.preventDefault();
          lightbox.close();
        } else if (modal.isOpen) {
          e.preventDefault();
          modal.close();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [chatOpen, lightbox.isOpen, modal.isOpen, lightbox.close, modal.close]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    const anyOpen = chatOpen || modal.isOpen || lightbox.isOpen;
    document.body.style.overflow = anyOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [chatOpen, modal.isOpen, lightbox.isOpen]);

  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to content</a>
      <MobileNav onOpenChat={() => setChatOpen(true)} />
      <div className="site-layout">
        <Sidebar onOpenChat={() => setChatOpen(true)} />
        <main id="main-content" className="main-content">
          {sections.map((section) => (
            <Section
              key={section.id}
              section={section}
              onHeadlineClick={handleHeadlineClick}
              onLightbox={handleLightbox}
            />
          ))}
        </main>
      </div>
      <Modal
        isOpen={modal.isOpen}
        activeItem={modal.activeItem}
        isExpanded={modal.isExpanded}
        onClose={modal.close}
        onToggleExpanded={modal.toggleExpanded}
      />
      {/* Standalone lightbox for card thumbnails when no modal is open */}
      {!modal.isOpen && (
        <Lightbox
          isOpen={lightbox.isOpen}
          media={lightbox.media}
          onClose={lightbox.close}
        />
      )}
      <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}

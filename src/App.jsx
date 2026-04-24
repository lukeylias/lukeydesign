import { useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MobileNav from './components/MobileNav/MobileNav';
import Section from './components/Section/Section';
import Modal from './components/Modal/Modal';
import Lightbox from './components/Lightbox/Lightbox';
import sections from './data';
import useModal from './hooks/useModal';
import useLightbox from './hooks/useLightbox';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/layout.css';

export default function App() {
  const modal = useModal();
  const lightbox = useLightbox();

  function handleHeadlineClick(item, sectionId) {
    modal.open(item, sectionId);
  }

  function handleLightbox(media) {
    lightbox.open(media);
  }

  // Centralised ESC handler — lightbox first, then modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        if (lightbox.isOpen) {
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
  }, [lightbox.isOpen, modal.isOpen, lightbox.close, modal.close]);

  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to content</a>
      <MobileNav />
      <div className="site-layout">
        <Sidebar />
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
        lightbox={lightbox}
      />
      {/* Standalone lightbox for card thumbnails when no modal is open */}
      {!modal.isOpen && (
        <Lightbox
          isOpen={lightbox.isOpen}
          media={lightbox.media}
          onClose={lightbox.close}
        />
      )}
    </>
  );
}

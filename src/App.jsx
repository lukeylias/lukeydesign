import { useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MobileNav from './components/MobileNav/MobileNav';
import Section from './components/Section/Section';
import Modal from './components/Modal/Modal';
import MediaViewer from './components/MediaViewer/MediaViewer';
import sections from './data';
import useModal from './hooks/useModal';
import useMediaViewer from './hooks/useMediaViewer';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/layout.css';

export default function App() {
  const modal = useModal();
  const mediaViewer = useMediaViewer();

  function handleHeadlineClick(item, sectionId) {
    modal.open(item, sectionId);
  }

  function handleImageClick(src, alt) {
    mediaViewer.open(src, alt);
  }

  // Centralised ESC handler — media viewer first, then modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        if (mediaViewer.isOpen) {
          e.preventDefault();
          mediaViewer.close();
        } else if (modal.isOpen) {
          e.preventDefault();
          modal.close();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mediaViewer.isOpen, modal.isOpen, mediaViewer.close, modal.close]);

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
              onImageClick={handleImageClick}
            />
          ))}
        </main>
      </div>
      <Modal
        isOpen={modal.isOpen}
        activeItem={modal.activeItem}
        onClose={modal.close}
        onImageClick={handleImageClick}
      />
      <MediaViewer
        isOpen={mediaViewer.isOpen}
        src={mediaViewer.src}
        alt={mediaViewer.alt}
        onClose={mediaViewer.close}
      />
    </>
  );
}

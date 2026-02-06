import React from 'react';
import { useLightbox } from '../contexts/LightboxContext';
import './GlobalLightbox.css';

const GlobalLightbox = () => {
  const { lightbox, close, prev, next } = useLightbox();

  if (!lightbox.isOpen || !lightbox.images || lightbox.images.length === 0) {
    return null;
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  const handlePrevClick = (e) => {
    e.stopPropagation();
    prev();
  };

  const handleNextClick = (e) => {
    e.stopPropagation();
    next();
  };

  return (
    <div className="global-lightbox-backdrop" onClick={handleBackdropClick}>
      <div className="global-lightbox-content">
        <button className="global-lightbox-close" onClick={close}>✕</button>
        <img src={lightbox.images[lightbox.currentIndex]} alt={`moment-${lightbox.currentIndex}`} />
        <button className="global-lightbox-prev" onClick={handlePrevClick}>◀</button>
        <button className="global-lightbox-next" onClick={handleNextClick}>▶</button>
      </div>
    </div>
  );
};

export default GlobalLightbox;

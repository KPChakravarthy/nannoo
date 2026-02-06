import React, { createContext, useState, useCallback } from 'react';

export const LightboxContext = createContext();

export const LightboxProvider = ({ children }) => {
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const open = useCallback((images, startIndex = 0) => {
    setLightbox({
      isOpen: true,
      images: images.map(getFull),
      currentIndex: startIndex,
    });
  }, []);

  const close = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const prev = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1,
    }));
  }, []);

  const next = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === prev.images.length - 1 ? 0 : prev.currentIndex + 1,
    }));
  }, []);

  return (
    <LightboxContext.Provider value={{ lightbox, open, close, prev, next }}>
      {children}
    </LightboxContext.Provider>
  );
};

const getFull = (src) => {
  try {
    if (/w=\d+/.test(src)) return src.replace(/w=\d+/, 'w=2048');
    return src;
  } catch (e) {
    return src;
  }
};

export const useLightbox = () => {
  const context = React.useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within LightboxProvider');
  }
  return context;
};

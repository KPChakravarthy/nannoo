import React from 'react';
import { useLightbox } from '../contexts/LightboxContext';
import './ImageGrid.css';

const ImageGrid = ({ images = [] }) => {
  const { open: openLightbox } = useLightbox();

  const openAt = (index) => {
    openLightbox(images, index);
  };

  if (!images || images.length === 0) return null;

  const img0 = images[0];
  const img1 = images[1];
  const img2 = images[2];
  const hasMore = images.length > 3;

  return (
    <div className="image-grid">
      {/* Left: Large portrait image */}
      {img0 && (
        <button
          type="button"
          className="grid-item large-portrait"
          onClick={() => openAt(0)}
          style={{ backgroundImage: `url(${img0})` }}
          aria-label="Open photo 1"
        />
      )}

      {/* Right: Stacked squares */}
      <div className="grid-right-stack">
        {img1 && (
          <button
            type="button"
            className="grid-item small-square"
            onClick={() => openAt(1)}
            style={{ backgroundImage: `url(${img1})` }}
            aria-label="Open photo 2"
          />
        )}
        {img2 && (
          <div className="grid-item-wrapper">
            <button
              type="button"
              className="grid-item small-square"
              onClick={() => openAt(2)}
              style={{ backgroundImage: `url(${img2})` }}
              aria-label="Open photo 3"
            />
            {hasMore && (
              <button
                type="button"
                className="overlay-count"
                onClick={() => openAt(2)}
                aria-label={`Open ${images.length - 3} more photos`}
              >
                +{images.length - 3}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGrid;

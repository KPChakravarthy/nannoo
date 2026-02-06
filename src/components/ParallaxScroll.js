import React, { useState, useEffect, useRef } from 'react';
import { milestones } from './milestones';
import ImageGrid from './ImageGrid';
import './ParallaxScroll.css';

const ParallaxScroll = ({ scrollY }) => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 1 }
    );

    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  return (
    <section className="parallax-scroll">
      {milestones.map((milestone, index) => {
        const opacity = Math.max(0, 1 - Math.abs(scrollY - (index * 800)) / 600);
        const isVisible = visibleSections.has(index);
        
        return (
          <div 
            key={index} 
            className="scroll-section"
            data-index={index}
            ref={(el) => {
              if (el && observerRef.current) {
                observerRef.current.observe(el);
              }
            }}
          >
            <div 
              className="section-image"
              style={{
                backgroundImage: `url(${milestone.image})`,
                opacity: Math.min(1, opacity + 0.3),
              }}
            />

            {isVisible && (
              <div className="section-wrapper in-view">
                <div className="section-content">
                  <div className="content-inner">
                    <div className="card-text in-view">
                      <h2 className="section-title">{milestone.title}</h2>
                      <p className="section-description">{milestone.description}</p>
                    </div>

                    <div className="section-photos in-view">
                      <ImageGrid images={milestone.gallery || [milestone.image]} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ParallaxScroll;

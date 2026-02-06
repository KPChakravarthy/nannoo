import React, { useState, useEffect } from 'react';
import './App.css';
import FloatingHearts from './components/FloatingHearts';
import ParallaxScroll from './components/ParallaxScroll';
import GlobalLightbox from './components/GlobalLightbox';
import { LightboxProvider } from './contexts/LightboxContext';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LightboxProvider>
      <div className="App">
        <div
          className="bg-parallax"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
          }}
        />

        <FloatingHearts />
        
        <header className="App-header">
          <h1 className="cursive">Nannoo meri jaan</h1>
          <p className="header-subtitle">A Journey Through Time</p>
        </header>
        
        <main>
          <ParallaxScroll scrollY={scrollY} />
        </main>

        <footer className="App-footer">
          <p>Cherished Moments</p>
        </footer>

        <GlobalLightbox />
      </div>
    </LightboxProvider>
  );
}

export default App;

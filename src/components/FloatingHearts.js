import React from 'react';
import './FloatingHearts.css';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 10 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${10 + Math.random() * 5}s`,
      fontSize: `${Math.random() * 10 + 10}px`,
      '--sway-amount': `${Math.random() * 100 - 50}px`
    };
    return (
      <div key={i} className="heart-container" style={style}>
        <div className="heart"></div>
      </div>
    );
  });

  return <div className="floating-hearts">{hearts}</div>;
};

export default React.memo(FloatingHearts);

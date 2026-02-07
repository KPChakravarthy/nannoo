import React, { useState, useEffect } from 'react';
import './EntryScreen.css';

const EntryScreen = ({ onAuthenticated }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [showValentine, setShowValentine] = useState(false);

  const [yesIndex, setYesIndex] = useState(0);

  // Pixel heart coordinates
  // tweak spacing/size easily
  const coords = [
    [1,0],[5,0],
    [0,1],[3,1],[6,1],
    [0,2],[6,2],
    [1,3],[5,3],
    [2,4],[4,4],
    [3,5]
  ];

  const spacing = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    // setShowValentine(true);
    // return
    if (passcode === '240422') {
      setShowValentine(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleYes = () => {
    onAuthenticated();
  };

  return (
    <div className="entry-screen">
      <div className="entry-container">
        {!showValentine ? (
          <form onSubmit={handleSubmit} className="entry-form">
            <h1 className='header cursive'>Challenge: 1</h1>
            <p className='mb-0'>Enter Passcode</p>
            <p>Hint: 📿</p>
            <section className='input'>
              <p>6 digit passcode</p>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
              {error && <p className="error">Incorrect passcode</p>}
            </section>
            <button type="submit" className='passcode-submit-btn'>Submit</button>
          </form>
        ) : (
          <div className="val-container">
            <h1 className='header cursive'>Challenge: 2</h1>
            <p>💖 Will you be my valentine? 💖</p>
            <div className="heart-area">
              <div className="container">
                {coords.map(([x,y], i) => {
                  const isYes = i === yesIndex;

                  return (
                    <button
                      key={i}
                      className={`val-btn ${isYes ? "yes" : "no"}`}
                      style={{
                        left: x * spacing,
                        top: y * spacing
                      }}
                      onMouseEnter={() => setYesIndex(i)}
                      onClick={handleYes}
                    >
                      {isYes ? "YES ❤️" : "NO 🙈"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryScreen;

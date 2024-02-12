// Accueil.jsx

import React from 'react';
import '../theme/accueil-style.css';

const Accueil = () => {
  return (
    <div className="accueil">
      <div className="gif-container">
        <img className="imageAccueil" src="../src/video/friendsImage.gif" alt="GIF d'accueil" />
        <div className="text-container">
        <h1>Smelly Cat's Corner</h1>
          <p>SHOP - FRIENDS</p>
        </div>
      </div>
    </div>
  );
};

export default Accueil;


import React from 'react';
import '../theme/accueilStyle.css'; // Assurez-vous que le chemin est correct


const Accueil = () => {
  return (
    <div className="accueil">
      <h1>Bienvenue sur notre site</h1>
      <div className="gif-container">
        <img className="imageAccueil" src="../src/video/friendsGif.gif" alt="GIF d'accueil" />
        <div className="text-container">
          <h2>Smelly Cat's Corner</h2>
          <p>FRIENDS - SHOP</p>
        </div>
      </div>
    </div>
  );
};

export default Accueil;

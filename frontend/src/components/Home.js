import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="home">
      <h1>Bienvenue dans le générateur de CV</h1>
      {token ? (
        <div>

          {/* Boutons conditionnels affichés si l'utilisateur est connecté */}
          <div>
            <button onClick={() => navigate('/cvs')}>Voir tous les CV</button>
            <button onClick={() => navigate('/cvs')}>Voir mes CV</button>
            <button onClick={() => navigate('/cv/create')}>Créer un nouveau CV</button>
          </div>
          <p>Vous êtes connecté</p>
          <button onClick={logout}>Se déconnecter</button>
        </div>
      ) : (
        <div>
          <Link to="/register">S'inscrire</Link> | <Link to="/login">Se connecter</Link>
        </div>
      )}
      <div>
        <Link to="/">Menu Principal</Link>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Remplacer useHistory par useNavigate

const Home = () => {
  const navigate = useNavigate();  // Remplacer useHistory par useNavigate
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');  // Utilisation de navigate pour rediriger
  };

  return (
    <div className="home">
      <h1>Bienvenue dans le générateur de CV</h1>
      {token ? (
        <div>
          <p>Vous êtes connecté</p>
          <button onClick={logout}>Se déconnecter</button>
        </div>
      ) : (
        <div>
          <Link to="/register">S'inscrire</Link> | <Link to="/login">Se connecter</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
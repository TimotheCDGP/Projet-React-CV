import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddRecommendation from '../recommendation/AddRecommendation'; // Assurez-vous que le chemin est correct

const CVList = () => {
  const [cvs, setCvs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCvId, setSelectedCvId] = useState(null); // État pour stocker le CV sélectionné pour ajouter une recommandation
  const [recommendations, setRecommendations] = useState({}); // État pour stocker les recommandations de chaque CV

  const fetchCVs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cvs', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCvs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRecommendations = async (cvId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recommendations/${cvId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRecommendations(prevState => ({
        ...prevState,
        [cvId]: res.data
      }));
    } catch (err) {
      console.error('Erreur lors de la récupération des recommandations', err);
    }
  };

  useEffect(() => {
    fetchCVs();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const searchCVs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cvs/search?name=${searchQuery}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCvs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetSearch = () => {
    setSearchQuery('');
    fetchCVs();
  };

  const handleRecommendationAdded = () => {
    fetchCVs(); // Récupérer à nouveau les CV pour afficher la nouvelle recommandation
    setSelectedCvId(null); // Ferme le formulaire après l'ajout
  };

  return (
    <div>
      <h2>Liste des CV</h2>
      <input 
        type="text" 
        placeholder="Rechercher par nom ou prénom" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px', marginRight: '10px' }}
      />
      <button onClick={searchCVs} style={{ marginRight: '10px' }}>Rechercher</button>
      <button onClick={resetSearch}>Réinitialiser</button>

      <ul>
        {cvs.map(cv => (
          <li key={cv._id}>
            <p>
              {cv.firstName} {cv.lastName} - {cv.createdAt ? formatDate(cv.createdAt) : 'Date inconnue'}
            </p>
            <div>
              <button onClick={() => setSelectedCvId(cv._id)}>Ajouter une recommandation</button>
              <Link to={`/cv/${cv._id}`}>Voir le CV</Link>
              <button onClick={() => fetchRecommendations(cv._id)}>Voir les recommandations</button> {/* Bouton pour voir les recommandations */}
            </div>
            
            {/* Ajouter une recommandation */}
            {selectedCvId === cv._id && (
              <AddRecommendation cvId={cv._id} onRecommendationAdded={handleRecommendationAdded} />
            )}

            {/* Afficher les recommandations */}
            {recommendations[cv._id] && (
              <div>
                <h3>Recommandations :</h3>
                <ul>
                  {recommendations[cv._id].map((rec, index) => (
                    <li key={index}>
                      <p>{rec.message}</p>
                      <small>{rec.userId.name}</small>
                      <small>{formatDate(rec.createdAt)}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      <Link to="/cv/create" style={{ display: 'block', margin: '20px 0' }}>Créer un nouveau CV</Link>

      <div>
        <Link to="/">Menu Principal</Link>
      </div>
    </div>
  );
};

export default CVList;
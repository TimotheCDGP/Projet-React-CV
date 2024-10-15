import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CVDetail = () => {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/cv/${id}`);
        setCv(res.data);
      } catch (err) {
        setError('Erreur lors de la récupération du CV');
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/cv/${id}/recommendations`);
        setRecommendations(res.data);
      } catch (err) {
        setError('Erreur lors de la récupération des recommandations');
      }
    };

    fetchCV();
    fetchRecommendations();
  }, [id]);

  const handleRecommendationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.REACT_APP_API_URL}/cv/${id}/recommendations`, { recommendation });
      setRecommendations([...recommendations, { text: recommendation }]);
      setRecommendation('');
    } catch (err) {
      setError("Erreur lors de l'ajout de la recommandation");
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!cv) return <p>Chargement...</p>;

  return (
    <div className="cv-detail">
      <h2>
        {cv.nom} {cv.prenom}
      </h2>
      <p>{cv.description}</p>
      <h3>Expériences Pédagogiques</h3>
      <p>{cv.experiencesPeda}</p>
      <h3>Expériences Professionnelles</h3>
      <p>{cv.experiencesPro}</p>
      <h3>Recommandations</h3>
      {recommendations.length === 0 ? (
        <p>Aucune recommandation pour ce CV.</p>
      ) : (
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>{rec.text}</li>
          ))}
        </ul>
      )}
      {isAuthenticated && (
        <form onSubmit={handleRecommendationSubmit}>
          <div>
            <label>Ajouter une recommandation :</label>
            <textarea value={recommendation} onChange={(e) => setRecommendation(e.target.value)} required />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      )}
    </div>
  );
};

export default CVDetail;

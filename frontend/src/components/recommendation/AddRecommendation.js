import React, { useState } from 'react';
import axios from 'axios';

const AddRecommendation = ({ cvId, onRecommendationAdded }) => {
  const [recommendationText, setRecommendationText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/recommendations', {
        text: recommendationText,
        cvId: cvId,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Appel de la fonction de rappel pour indiquer qu'une recommandation a été ajoutée
      onRecommendationAdded();
      setRecommendationText('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recommandation', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={recommendationText}
        onChange={(e) => setRecommendationText(e.target.value)}
        placeholder="Écrivez votre recommandation ici"
        required
      />
      <button type="submit">Ajouter la recommandation</button>
    </form>
  );
};

export default AddRecommendation;
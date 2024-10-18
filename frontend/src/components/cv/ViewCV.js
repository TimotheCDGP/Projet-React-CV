import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ViewCVPublic = () => {
  const [cv, setCv] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cvs/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCv(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCV();
  }, [id]);

  // Fonction pour formater la date et l'heure
  const formatDate = (dateString) => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    
    return `${formattedDate} à ${formattedTime}`;  // On combine la date et l'heure
  };

  return (
    <div>
      {cv.firstName && cv.lastName ? (
        <h2>
          CV de {cv.firstName} {cv.lastName}
        </h2>
      ) : (
        <h2>Chargement du CV...</h2>
      )}

      <p>Description : {cv.description}</p>

      <h3>Éducation</h3>
      {cv.education && cv.education.length > 0 ? (
        <ul>
          {cv.education.map((edu) => (
            <li key={edu._id}>
              {edu.degree} à {edu.institution} ({edu.year})
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune éducation renseignée</p>
      )}

      <h3>Expérience professionnelle</h3>
      {cv.workExperience && cv.workExperience.length > 0 ? (
        <ul>
          {cv.workExperience.map((work) => (
            <li key={work._id}>
              {work.jobTitle} chez {work.company} ({work.duration}) :{' '}
              {work.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune expérience professionnelle renseignée</p>
      )}

      <p>Date de création : {cv.createdAt ? formatDate(cv.createdAt) : 'Inconnue'}</p>
      <p>Dernière mise à jour : {cv.updatedAt ? formatDate(cv.updatedAt) : 'Inconnue'}</p>

      <div>
        <Link to="/cvs">Retour à la liste de CV</Link>
      </div>

      <div>
        <Link to="/">Menu Principal</Link>
      </div>
    </div>
  );
};

export default ViewCVPublic;

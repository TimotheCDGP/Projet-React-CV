import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ViewCV = () => {
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
        <Link to="/">Menu Principal</Link>
      </div>

    </div>
  );
};

export default ViewCV;
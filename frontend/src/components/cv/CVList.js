import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CVList = () => {
  const [cvs, setCvs] = useState([]);

  useEffect(() => {
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
    fetchCVs();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Liste des CV</h2>
      <Link to="/cv/create">Créer un nouveau CV</Link>
      <ul>
        {cvs.map(cv => (
          <li key={cv._id}>
            <p>
              {cv.firstName} {cv.lastName} - {cv.createdAt ? formatDate(cv.createdAt) : 'Date inconnue'}
            </p>
            <div>
              <Link to={`/cv/edit/${cv._id}`} style={{ marginRight: '10px' }}>Modifier</Link>
              <Link to={`/cv/${cv._id}`}>Détails</Link>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <Link to="/">Menu Principal</Link>
      </div>
      
    </div>
  );
};

export default CVList;
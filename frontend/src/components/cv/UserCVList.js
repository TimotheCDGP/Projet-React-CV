import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserCVList = () => {
  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    const fetchUserCvs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cvs/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCvs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserCvs();
  }, []);

  const toggleVisibility = async (cvId, currentVisibility) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cvs/${cvId}`, 
        { visible: !currentVisibility },  // On inverse la visibilité actuelle
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCvs(cvs.map(cv => (cv._id === cvId ? res.data : cv)));  // Met à jour la liste des CVs
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Mes CVs</h2>
      <ul>
        {cvs.map(cv => (
          <li key={cv._id}>
            <p>
              {cv.firstName} {cv.lastName} - {cv.createdAt ? formatDate(cv.createdAt) : 'Date inconnue'}
            </p>

            <div>
              <label>
                Visibilité : 
                <input 
                  type="checkbox" 
                  checked={cv.visible} 
                  onChange={() => toggleVisibility(cv._id, cv.visible)}
                />
                {cv.visible ? 'Visible' : 'Non visible'}
              </label>
            </div>

            <div>
              <Link to={`/cv/${cv._id}`} style={{ marginRight: '10px' }}>Voir le CV</Link>
              <Link to={`/cv/edit/${cv._id}`}>Modifier le CV</Link>
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

export default UserCVList;
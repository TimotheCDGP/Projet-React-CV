import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditCV = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    experience: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cvs/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCV();
  }, [id]);

  const { title, description, skills, experience } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/cvs/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/cvs');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Modifier le CV</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Titre</label>
          <input type="text" name="title" value={title} onChange={onChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={description} onChange={onChange} required />
        </div>
        <div>
          <label>Compétences</label>
          <input type="text" name="skills" value={skills} onChange={onChange} required />
        </div>
        <div>
          <label>Expérience</label>
          <input type="text" name="experience" value={experience} onChange={onChange} required />
        </div>
        <button type="submit">Modifier le CV</button>
      </form>

      <div>
        <Link to="/">Menu Principal</Link>
      </div>

    </div>
  );
};

export default EditCV;
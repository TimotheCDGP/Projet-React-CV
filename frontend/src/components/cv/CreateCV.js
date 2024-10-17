import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateCV = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    description: '',
    education: [
      { degree: '', institution: '', year: '' },
    ],
    workExperience: [
      { jobTitle: '', company: '', duration: '', description: '' },
    ],
    visible: true,
  });

  const { firstName, lastName, description, education, workExperience } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onEducationChange = (index, e) => {
    const updatedEducation = education.map((edu, i) => 
      i === index ? { ...edu, [e.target.name]: e.target.value } : edu
    );
    setFormData({ ...formData, education: updatedEducation });
  };

  const onExperienceChange = (index, e) => {
    const updatedExperience = workExperience.map((exp, i) => 
      i === index ? { ...exp, [e.target.name]: e.target.value } : exp
    );
    setFormData({ ...formData, workExperience: updatedExperience });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/cvs', formData, {
        headers: {
          'Content-Type': 'application/json',
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
      <h2>Créer un nouveau CV</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Prénom</label>
          <input type="text" name="firstName" value={firstName} onChange={onChange} required />
        </div>
        <div>
          <label>Nom</label>
          <input type="text" name="lastName" value={lastName} onChange={onChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={description} onChange={onChange} required />
        </div>

        <h3>Éducation</h3>
        {education.map((edu, index) => (
          <div key={index}>
            <div>
              <label>Diplôme</label>
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => onEducationChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Institution</label>
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => onEducationChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Année</label>
              <input
                type="text"
                name="year"
                value={edu.year}
                onChange={(e) => onEducationChange(index, e)}
                required
              />
            </div>
          </div>
        ))}

        <h3>Expérience Professionnelle</h3>
        {workExperience.map((exp, index) => (
          <div key={index}>
            <div>
              <label>Titre du poste</label>
              <input
                type="text"
                name="jobTitle"
                value={exp.jobTitle}
                onChange={(e) => onExperienceChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Entreprise</label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => onExperienceChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Durée</label>
              <input
                type="text"
                name="duration"
                value={exp.duration}
                onChange={(e) => onExperienceChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={exp.description}
                onChange={(e) => onExperienceChange(index, e)}
                required
              />
            </div>
          </div>
        ))}

        <button type="submit">Créer le CV</button>
      </form>

      <div>
        <Link to="/">Menu Principal</Link>
      </div>

    </div>
  );
};

export default CreateCV;
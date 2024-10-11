import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    description: '',
    diploma: '',
    certifications: '',
    formations: '',
    experiences: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Logique pour générer le CV
    console.log(formData);
  };

  return (
    <>
      <label>
        Nom : <input name="nom" value={formData.nom} onChange={handleChange} />
      </label>
      <hr />
      <label>
        Prénom : <input name="prenom" value={formData.prenom} onChange={handleChange} />
      </label>
      <hr />
      <label>
        Description : <input name="description" value={formData.description} onChange={handleChange} />
      </label>
      <hr />
      <label>
        Diplôme : <input name="diploma" value={formData.diploma} onChange={handleChange} />
      </label>
      <hr />
      <label>
        Certifications : <input name="certifications" value={formData.certifications} onChange={handleChange} />
      </label>
      <hr />
      <label>
        Formations : <input name="formations" value={formData.formations} onChange={handleChange} />
      </label>
      <hr />
      <label>
        Expériences professionnelles : <input name="experiences" value={formData.experiences} onChange={handleChange} />
      </label>
      <hr />
      <button onClick={handleSubmit}>Générer le CV</button>
    </>
  );
}

export default App;

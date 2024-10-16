import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Remplacer useHistory par useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Remplacer useHistory par useNavigate

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');  // Utilisation de navigate pour rediriger
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="login">
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Mot de passe</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
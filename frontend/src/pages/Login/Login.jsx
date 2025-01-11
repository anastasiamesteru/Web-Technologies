import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); // Use navigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login validation logic here
    // If successful:
    onLogin();
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to the register page when clicked
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="register-container">
            <label>Don't have an account?</label>
            <button
              type="button"
              className="RegisterBtn"
              onClick={handleRegisterRedirect}
            >
              Register
            </button>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

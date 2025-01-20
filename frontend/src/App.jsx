import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './pages/Menu/Menu';
import Home from './pages/Home/Home';
import Bugs from './pages/Bugs/Bugs';
import Projects from './pages/Project/Project';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Team from './pages/Team/Team';

import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(''); //rol pentru a sti ce pagina sa afiseze

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setRole(role); // Set role on login
  };

  const handleRegister = (role) => {
    setIsAuthenticated(true);
    setRole(role); // Set role on registration
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Menu />}
        <div className={`content ${isAuthenticated ? 'authenticated' : ''}`}>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register onRegister={handleRegister} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/bugs" element={<Bugs />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/team" element={<Team />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

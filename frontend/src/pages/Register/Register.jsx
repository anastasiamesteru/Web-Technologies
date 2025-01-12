import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [isTester, setIsTester] = useState(false);
  const [isTeamMember, setIsTeamMember] = useState(false);

	const navigate = useNavigate();

	const handleTmRegister = () => {
    setIsTeamMember(isTeamMember);

	};
  const handleTstRegister = () => {
    setIsTester(!isTester);
	};

	const handleRegister = (event) => {
		event.preventDefault();
		let routeLink = isTester === true ? 'tester' : 'teammember';
		axios
			.post(`${url}${routeLink}/register`, { email, password, name })
			.then((res) => {
				toast.success('Account created successfully!');
				sleep(500).then(() => {
					navigate('/login');
				});
			})
			.catch((err) => {
				toast.error(err.response.data);
			});
	};


  return (
    <div className="register-page">
      <div className="form-container">
        <h2>Register</h2>
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
          <div className="login-container">
            <label>Already have an account?</label>
            <button
              type="button"
              className="LogInBtn"
              onClick={handleRegisterRedirect}
            >
              Log In
            </button>
          </div>
          <div className='register-btns'>
          <button type="submit" onSubmit={handleTstRegister} >Register as tester</button>
          <button type="submit" onSubmit={handleTmRegister}>Register as team member</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

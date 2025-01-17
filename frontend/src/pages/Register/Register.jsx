import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [isTester, setIsTester] = useState(false);
  const [isTeamMember, setIsTeamMember] = useState(false);
  const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	const handleTmRegister = () => {
    setIsTeamMember(true);
    setIsTester(false);
  }

  const handleTstRegister = () => {
    setIsTester(true);
    setIsTeamMember(false);
	};

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'name':
        if (!value) error = 'Name is required.';
        break;
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = 'Email is required.';
        else if (!emailRegex.test(value)) error = 'Invalid email format.';
        break;
      }
      case 'password':
        if (!value) error = 'Password is required.';
        else if (value.length < 8) error = 'Password must be at least 8 characters.';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateField('name', value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateField('email', value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validateField('password', value);
  };

  
	const handleRegister = (event) => {
		event.preventDefault();
		const routeLink = isTester ? 'tester' : 'teammember';
    const url = 'http://localhost:5000/'; // Your backend API URL
    // const role = isTeamMember ? 'team' : isTester ? 'tester' : '';
    // if (role) {
    //   try {
    //     console.log(`Registering as ${role}`);
    //     alert(`Registered as ${role}`);
    //   } catch (err) {
    //     console.error(err);
    //     alert('Registration failed');
    //   }
    // } else {
    //   alert('Please select a role');
    // }
  
		axios.post(`${url}register`, { email, password, name, role })
      .then((res) => {
        alert('Account created successfully!');
        onRegister(role); 
        navigate('/home');
      })
      .catch((err) => {
        alert('Registration failed');
      });
	};

  const handleSubmit = (e) => {
    e.preventDefault();

    validateField('name', name);
    validateField('email', email);
    validateField('password', password);

    if (!errors.name && !errors.email && !errors.password) {
      console.log('Form submitted successfully:', { name, email, password });
    }
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
              onChange={handleNameChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            {errors.mail && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="login-container">
            <label>Already have an account?</label>
            <button
              type="button"
              className="LogInBtn"
              onClick={() => navigate('/login')}
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

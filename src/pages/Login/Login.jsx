import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const Login = ({ setIsLogged }) => {
  // React state
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  // Login submit function
  const handleLogin = () => {
    if (userInfo.username === 'foo' && userInfo.password === 'bar') {
      setIsLogged(true);
      navigate('/home');
    } else if (userInfo.username === '' || userInfo.password === '') {
      alert('Username or Password should not be empty!');
    } else {
      alert('Username or Password is incorrect! Please try again!');
    }
  };

  return (
    <div>
      <nav className="navbar-login">
        <p>Face</p>
      </nav>
      <div className="login-container">
        <div className="illustration-container-login">
          <img
            src="https://www.pngall.com/wp-content/uploads/12/Illustration-PNG.png"
            alt="Login Illustration"
            width={500}
            className="login-illustration"
          />
        </div>
        <div className="login-form-container">
          <h2>Login</h2>
          <div>
            <TextField
              style={{ width: '20em', margin: '1em' }}
              label="Username"
              variant="filled"
              onChange={(e) =>
                setUserInfo((prev) => {
                  return { ...prev, username: e.target.value };
                })
              }
            />
          </div>
          <div>
            <TextField
              style={{ width: '20em', margin: '1em' }}
              label="Password"
              variant="filled"
              type={'password'}
              onChange={(e) =>
                setUserInfo((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
          </div>
          <div>
            <Button onClick={handleLogin} variant="contained">
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="footer-login">2022 ©️ Face.com</div>
    </div>
  );
};

export default Login;

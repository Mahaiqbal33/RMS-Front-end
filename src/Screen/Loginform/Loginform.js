import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import user from "../../assets/User.png";
import passwordicon from '../../assets/Forgotpassword.png';
import { authStore } from '../../Store/AuthStore';
import './logindesign.css'
import { ToastContainer, toast } from 'react-toastify';
import { validateForm } from './Validation'
import { privateRoutes } from '../../Store/PrivateRoutes';
import axios from 'axios';

const LoginForm = observer(() => {
  const navigate = useNavigate();
  const notify = () => toast("Invalid credentials. Please try again.");

  useEffect(() => {
    // Check if token exists in local storage and redirect to the sidebar if it does
    const token = localStorage.getItem('token');
    if (token) {
      privateRoutes.token = true;
      navigate('/sidebar');
    }
  }, [navigate]);
  //this function work when form values enter
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      authStore.setFormField(name, checked);
    } else {
      authStore.setFormField(name, value);
    }
  };
  // this function on submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          username: authStore.formFields.username,
          password: authStore.formFields.password
        });

        // Handle successful login response
        if (response.data) {
          const token = response.token; // Assuming the token is returned as 'token' in the response
          localStorage.setItem('token', token); // Save the token to local storage
          privateRoutes.token = true;
          navigate('/sidebar');
        }
      } catch (error) {
        // Handle login error
        authStore.setError('Invalid credentials. Please try again.');
        notify();
      }
    }
    authStore.clearFormFields();
  };

  if (authStore.isLoggedIn) {
    navigate("/sidebar");
    return null; // Return null when redirecting to prevent rendering the rest of the component
  }

  return (
    <div className='containerform'>
      <div className="forms">
        <div className="login-form">
          <h1>Welcome Back!</h1>
          <h3>Start managing your result faster and better</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-boxes">
              <label htmlFor="username" className="input-lebal">Username</label>
              <div className="input-box">
                <img src={user} className="iconff" alt='' />
                <input
                  placeholder="Enter your username"
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={authStore.formFields.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <label htmlFor="password" className="input-lebal">Password</label>
              <div className="input-box">
                <img src={passwordicon} className="iconff" alt='' />
                <input
                  placeholder="Enter your password"
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  value={authStore.formFields.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {authStore.errors && <p className='errorStyle'>{authStore.errors}</p>}
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  defaultChecked={authStore.rememberMe}
                  onChange={handleInputChange}
                  className="checkbox-input small-checkbox"
                />

                <label htmlFor="rememberMe" className="checkbox-label">Remember Me</label>
              </div>
              <div className="button input-box">
                <input type="submit" value="LOGIN" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="front">
        <img src="./loginformImg.png" alt="" />
      </div>
      <ToastContainer />
    </div>
  );
});

export default LoginForm;

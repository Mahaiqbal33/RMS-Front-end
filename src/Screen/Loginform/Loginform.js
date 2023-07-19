import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import user from "../../assets/User.png";
import passwordicon from '../../assets/Forgotpassword.png';
import { authStore } from '../../Store/LoginStore/AuthStore';
import './logindesign.css'
import { validateForm } from './Validation'
import { privateRoutes } from '../../Store/Sidebarstore/PrivateRoutes';
import { SC } from '../../Services/serverCall';

const LoginForm = observer(() => {
  const navigate = useNavigate();

//HandleChange function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
      authStore.setFormField(name, value);
  };
  
 //HandleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await SC.postCall('/create', {
          username: authStore.formFields.username,
          password: authStore.formFields.password
        });

        if (response.data) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          privateRoutes.token = true;
          navigate('/sidebar');
        }
      } catch (error) {
        authStore.setError('Invalid credentials. Please try again.');
      }
    }
    authStore.clearFormFields();
  };

  if (authStore.isLoggedIn) {
    navigate("/sidebar");
    return null;
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
    </div>
  );
});

export default LoginForm;

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Heading, Heading2, Subtitle } from '../../Theme/Topography/Topography';
import user from "../../assets/User.png";
import passwordicom from '../../assets/Forgotpassword.png';
import { authStore } from '../../Store/AuthStore';
import './logindesign.css'
import { ToastContainer, toast } from 'react-toastify';
import { validateForm } from './Validation'
const LoginForm = observer(() => {
const navigate = useNavigate();
const notify=()=> toast("Please Enter Corrent Username and email")
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      authStore.setUsername(value);
    } else if (name === 'password') {
      authStore.setPassword(value);
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      authStore.login();
      console.log(authStore.username,authStore.password)
      navigate("/sidebar");
    }
    else{
      notify();
    }
  };
  
  if (authStore.isLoggedIn)  {
    navigate("/sidebar");
    return null; // Return null when redirecting to prevent rendering the rest of the component
  }

  return (
    <div row className='containerform'>
      <div className="forms">
        <div className="login-form">
          <Heading white>Welcome Back!</Heading>
          <Heading2>Start managing your result faster and better</Heading2>
          <form onSubmit={handleSubmit}>
            <div className="input-boxes">
              <label htmlFor="username" className="input-lebal">Username</label>
              <div className="input-box">
                <img src={user} className="iconff" alt='' />
                <input
                  placeholder="Enter your username"
                  type="username"
                  id="username"
                  name="username"
                  value={authStore.username}
                  onChange={handleInputChange}
                  required />
              </div>

              <label htmlFor="username" className="input-lebal">Password</label>
              <div className="input-box">
                <img src={passwordicom} className="iconff" alt='' />
                <input
                  placeholder="Enter your password"
                  type="password"
                  id="password"
                  name="password"
                  value={authStore.password}
                  onChange={handleInputChange}
                  required />
              </div>
              {authStore.errors && <Subtitle white>{authStore.errors}</Subtitle>}
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

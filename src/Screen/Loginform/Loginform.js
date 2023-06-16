import React, { useState } from 'react'
import './logindesign.css'
import { Heading, Heading2,Subtitle } from '../../Theme/Topography/Topography'
import user from "../../assets/User.png"
import passwordicom from '../../assets/Forgotpassword.png'
import { authStore } from '../../Store/AuthStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
const Loginform =observer( () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  // handle function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setusername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  

  const validateForm = () => {
    if (!username || !password) {
      setErrors('Please fill in all fields');
      return false;
    }
    if (!username) {
      setErrors('Please enter a valid username');
      return false;
    }
    if (password.length < 6) {
      setErrors('Password should be at least 6 characters');
      return false;
    }
    setErrors('');
    return true;
  };
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (validateForm()) {
        // Perform login logic here
        console.log(username,password)
        console.log('Login successful');

      // Assuming login is successful, call the login action in the MobX store
      authStore.login();
      }
    };
  
    if (authStore.isLoggedIn) {
      return navigate("/sidebar");
    }
    return (
      <div row className='containerform'  >
        <div className="forms">
          <div className="login-form">
            <Heading white>Welcome Back!</Heading>
            <Heading2 >Start managing your result  faster and better</Heading2>
            <form  onSubmit={handleSubmit}>
              <div className="input-boxes">
                <label htmlFor="username" className="input-lebal">Username</label>
                <div className="input-box">
                  <img src={user} className="iconff" alt=''></img>
                  <input
                    placeholder="Enter your username"
                    type="username"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                    required />
                </div>
                
                <label htmlFor="username" className="input-lebal">Password</label>
                <div className="input-box">
                  <img src={passwordicom} className="iconff" alt=''></img>
                  <input
                    placeholder="Enter your password"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    required />
                </div>
                {errors && <Subtitle white>{errors}</Subtitle>}
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

    )
  }
)
  export default Loginform

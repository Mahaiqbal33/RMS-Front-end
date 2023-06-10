import React, { useState } from 'react'
import './logindesign.css'
import { Heading, Heading2 } from "../../Theme/DesignSystem";
import user from "../../assets/User.png"
import passwordicom from '../../assets/Forgotpassword.png'
const Loginform = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
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
      let isValid = true;
      const newErrors = {};
  
      if (!username) {
        newErrors.username = 'username is required';
        isValid = false;
      }
  
      if (!password) {
        newErrors.password = 'Password is required';
        isValid = false;
      }
  
      setErrors(newErrors);
      return isValid;
    };
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (validateForm()) {
        // Perform login logic here
        console.log('Login successful');
      }
    };
    return (
      <di row className='containerform'  >
        <div className="forms">
          <div className="login-form">
            <Heading white>Welcome Back!</Heading>
            <Heading2 >Start managing your result  faster and better</Heading2>
            <form action="#" onSubmit={handleSubmit}>
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
                {errors.username && <span>{errors.username}</span>}
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
                {errors.password && <span>{errors.password}</span>}
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
      </di>

    )
  }

  export default Loginform

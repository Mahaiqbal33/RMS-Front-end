import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import user from "../../assets/User.png";
import role from "../../assets/role.png";
import passwordicon from '../../assets/Forgotpassword.png';
import { authStore } from '../../Store/LoginStore/AuthStore';
import './logindesign.css'
import { validateForm } from './Validation'
import sweetAlertConfig from '../../Component/Alerts/alertConfig'
import { privateRoutes } from '../../Store/Sidebarstore/PrivateRoutes';
import { SC } from '../../Services/serverCall';
import { toJS } from 'mobx';
import { setToken } from '../../Utilits/SetToken';


const LoginForm = observer(() => {
  const navigate = useNavigate();
  const {formFields} = authStore;
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
        const response = await SC.postCall('/login', {
          username:formFields.username,
          password:formFields.password,
          role:formFields.role
        });

        if (response.data) {
          // Store the token and expiration date in localStorage
          setToken(response.data.token,response.data.expires_at,response.data.role);
          privateRoutes.token = true;
          navigate('/sidebar');
        }
      } catch (error) {
        sweetAlertConfig.errorAlert(error.message)
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
                    value={formFields.username}
                    onChange={handleInputChange}
                    required
                  />
              </div>
              {authStore.errors.username && <p className='errorStyle'>{toJS(authStore.errors).username}</p>}
              <label htmlFor="password" className="input-lebal">Password</label>
              <div className="input-box">
                <img src={passwordicon} className="iconff" alt='' />
                <input
                  placeholder="Enter your password"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  value={formFields.password}
                  required
                />
              </div>
              {authStore.errors.password&& <p className='errorStyle'>{authStore.errors.password}</p>}
              <label htmlFor="role" className="input-lebal">
                 What is your Role?
                </label>
                <div className="input-box">
                <img src={role} className="iconff" alt='' />
                <select
                  id="role"
                  name="role"
                  onChange={handleInputChange}
                  value={formFields.role}
                  required
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="student">student</option>
                  <option value="admin">admin</option>
                  <option value="teacher">teacher</option>
                </select>
              </div>
              {authStore.errors.role && <p className='errorStyle'>{toJS(authStore.errors).role}</p>}
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

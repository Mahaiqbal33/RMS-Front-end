import React,{useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { adminFormStore } from '../../Store/AdminStore/AdminForm';
import '../Style/PopupStyle.css'
import { RiAddCircleLine } from 'react-icons/ri';
import { SC } from '../../Services/serverCall';
import sweetAlertConfig from '../Alerts/alertConfig';
import { validateAdminForm } from '../../helper.js/FormAdminValidator';
import { toJS } from 'mobx';
import { adminStore } from '../../Store/AdminStore/AdminStore';
const AdminPopup = observer(({ onSubmit, adminId }) => {
  const { formData, errors } = adminFormStore;
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    adminFormStore.setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (adminId) {
      const admin = adminStore.getAdminById(adminId);
      console.log(admin.gender);
      adminFormStore.setFormData({
        username: admin.username,
        password: admin.password,
      });
    } else {
      adminFormStore.resetFormData(); 
    }
  }, [adminId]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // ... form validation and other code
    
    if (validateAdminForm) {
      // ... payload preparation and other code
      const { username, password } = formData;
      const payload = {
        username,
        password,
      };
  
      if (adminId) {
        await SC.putCall(`/admins/${adminId}`, payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            sweetAlertConfig.successAlert('Submit Successfully Form data');
            adminStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error);
            console.error(error.message);
          });
      } else {
        await SC.postCall('/admins', payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            sweetAlertConfig.successAlert('Submit Successfully Form data');
            adminStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error.message);
            console.error(error);
          });
      }
      // ... other code
      adminFormStore.resetFormData();
       adminFormStore.clearErrors();
    } else {
      adminFormStore.setError('Please fix the following errors:');
    }
  };
  
  const handleClose = () => {
    adminStore.setPopupOpen(false);
    adminFormStore.resetFormData();
    adminFormStore.clearErrors();
  };

  const handleAnotherAdmin = () => {
    adminFormStore.resetFormData();
    adminFormStore.clearErrors();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="popup-form" >
          <h1>Add Admin</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <label className="form-label" >
              Username<span className="required-field">*</span>
              <input
                id='username'
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              {errors.username && <div className="error-message">{toJS(errors).username}</div>}
            </label>
            <label className="form-label">
              Password<span className="required-field">*</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete='password'
                required
              />
              {errors.password && <div className="error-message">{toJS(errors).password}</div>}
            </label>
          </div>
          <div className="popup-btn-section">
            <button type="button" className="another-popup" onClick={handleAnotherAdmin}>
              <RiAddCircleLine />
              Add Another
            </button>
            <button type="submit" className="add-popup">
              Add Admin
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
});

export default AdminPopup;

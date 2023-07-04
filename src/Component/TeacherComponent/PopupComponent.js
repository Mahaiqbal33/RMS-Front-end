import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { formStore } from '../../Store/TeacherStore/FormStore';
import { teacherStore } from '../../Store/TeacherStore/TeacherStore';
import { RiAddCircleLine } from 'react-icons/ri';
import axios from 'axios';
import InputMask from 'react-input-mask';
import "../../Component/TeacherComponent/PopupStyle.css"
import { validateTeacherForm } from '../../Screen/Teachers/FormTeacherValidator';
import { toJS } from 'mobx';

const PopupComponent = observer(
  ({ onSubmit, teacherId }) => {
  const { formData } = formStore;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formStore.setFormData({ ...formStore.formData, [name]: value });
  };

  useEffect(() => {
    if (teacherId) {
      const teacher = teacherStore.getTeacherById(teacherId);
      console.log("hello pakistan")
      console.log(teacher)
      formStore.setFormData({
        fullName: teacher.firstName,
        username: teacher.email,
        role: teacher.role,
        gender: teacher.gender,
        password: teacher.password,
        phoneNumber: teacher.phoneNumber,
        subject: teacher.subject,
      });
    } else {
      formStore.resetFormData();
    }
  }, [teacherId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateTeacherForm()) {
      const { fullName, username, role, gender, password, phoneNumber, subject } = formData;
      console.log(fullName)

      const payload = {
        fullName,
        username,
        role,
        gender,
        password,
        phoneNumber,
        subject,
      };

      if (teacherId) {
        await axios
          .put(`/api/teachers/${teacherId}`, payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            teacherStore.setPopupOpen(false);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        await axios
          .post('https://dummy.restapiexample.com/api/v1/create', payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            teacherStore.setPopupOpen(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      formStore.resetFormData();
      formStore.clearErrors();
    }
    else {
      formStore.setError('Please fix the following errors:');
    }
  };

  const handleClose = () => {
    formStore.resetFormData();
    formStore.clearErrors();
    teacherStore.setPopupOpen(false);
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <form onSubmit={handleFormSubmit} className="teacher-popup-form">
          <h1>Add Teacher</h1>
          {formStore.errorMessage && <div className="error-message">{formStore.errorMessage}</div>}
          <div className="form-row">
            <label className="form-label">
              Full Name:
              <input type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required />
              {formStore.errors.fullName && (
                <div className="error-message">{toJS(formStore.errors).fullName}</div>
              )}
            </label>
            <label className="form-label">
              Username:
              <InputMask
                mask="9999-FAST-9999"
                maskChar=" "
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              {formStore.errors.username && (
                <div className="error-message">{toJS(formStore.errors).username}</div>
              )}
            </label>
          </div>
          <div className="form-row">
            <label className="form-label">
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="password"
                required
              />
              {formStore.errors.password && (
                <div className="error-message">{toJS(formStore.errors).password}</div>
              )}
            </label>
            <label className="form-label">
              Phone:
              <InputMask
                mask="+92 999-9999999"
                maskChar=" "
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
              {formStore.errors.phoneNumber && (
                <div className="error-message">{toJS(formStore.errors).phoneNumber}</div>
              )}
            </label>
          </div>
          <div className="form-row">
          <label className="form-label">
              Gender:
              <select name="gender" className="form-input" value={formData.gender} onChange={handleInputChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {formStore.errors.gender && (
                <div className="error-message">{toJS(formStore.errors).gender}</div>
              )}
            </label>
            <label className="form-label">
              Subject:
              <select name="subject" value={formData.subject} onChange={handleInputChange} required>
                <option value="">Select Subject</option>
                <option value="female">Math</option>
              </select>
              {formStore.errors.subject && (
                <div className="error-message">{toJS(formStore.errors).subject}</div>
              )}
            </label>
          </div>
          <div className="teacher-btn-section">
            <button type="button" className="another-teacher">
              <RiAddCircleLine />
              Add Another
            </button>
            <button type="submit" className="add-teacher">
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default PopupComponent;

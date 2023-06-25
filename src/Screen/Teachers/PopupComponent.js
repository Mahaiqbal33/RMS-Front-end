import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { formStore } from '../../Store/FormStore';
import { teacherStore } from '../../Store/TeacherStore';
import { RiAddCircleLine } from 'react-icons/ri';
import axios from 'axios';
import './PopupComponent.css';

const PopupComponent = observer(({ onSubmit, teacherId }) => {
  const { formData } = formStore;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formStore.setFormData({ ...formStore.formData, [name]: value });
  };
  useEffect(() => {
    if (teacherId) {
      const teacher = teacherStore.getTeacherById(teacherId);
      console.log(teacher.firstName); // Check the value of teacher
      console.log(teacher.phoneNumber); // Check the value of teacher.phoneNumber

      formStore.setFormData({
        fullName: teacher.firstName,
        email: teacher.email,
        className: teacher.className,
        gender: teacher.gender,
        password: teacher.password,
        phoneCountryCode: teacher.phoneNumber ? teacher.phoneNumber.slice(0, 3) : '',
        phoneNumber: teacher.phoneNumber ? teacher.phoneNumber.slice(3) : '',
        subject: teacher.subject
      });
    } else {
      formStore.resetFormData();
    }


  }, [teacherId]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formStore.validateForm()) {
      const { fullName, email, className, gender, password, phoneCountryCode, phoneNumber, subject } = formData;
      console.log(formData)
      // Create the payload for the backend request
      const payload = {
        fullName,
        email,
        className,
        gender,
        password,
        phoneNumber: phoneCountryCode + phoneNumber, // Combine the country code and phone number
        subject
      };

      if (teacherId) {
        // Update the teacher using the teacherId
        await axios.put(`/api/teachers/${teacherId}`, payload)
          .then((response) => {
            // Handle the response from the backend if needed
            console.log(response.data);
            onSubmit();
            teacherStore.setPopupOpen(false);
          })
          .catch((error) => {
            // Handle the error if the request fails
            console.error(error);
          });
      } else {
        // Add a new teacher
        await axios.post('/api/teachers', payload)
          .then((response) => {
            // Handle the response from the backend if needed
            console.log(response.data);
            onSubmit();
            teacherStore.setPopupOpen(false);
          })
          .catch((error) => {
            // Handle the error if the request fails
            console.error(error);
          });
      }
    }

    formStore.resetFormData();
    formStore.clearErrorMessage();
  };

  const handleClose = () => {
    formStore.resetFormData();
    formStore.clearErrorMessage();
    teacherStore.setPopupOpen(false);
  };


  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <form onSubmit={handleFormSubmit} className='teacher-popup-form'>
          <h1>Add Teacher</h1>
          {formStore.errorMessage && <div className="error-message">{formStore.errorMessage}</div>}
          <div className="form-row">
            <label className="form-label">
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="form-label">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label className="form-label">
              Class:
              <select
                name="className"
                className="form-input"
                value={formData.className}
                onChange={handleInputChange}
              >
                <option value="">Select Class</option>
                <option value="1st year">1st year</option>
                <option value="2nd year">2nd year</option>
              </select>
            </label>

            <label className="form-label">
              Gender:
              <select
                name="gender"
                className="form-input"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
                autoComplete='password'
                required
              />
            </label>

            <div className="phone-field">
              <label className="form-label">
                Phone:
              </label>
              <div className="phone-input">
                <input
                  type="text"
                  name="phoneCountryCode"
                  value={formData.phoneCountryCode}
                  placeholder="+92"
                  maxLength="3"
                  required
                  className="country-code-input"
                  readOnly
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  className="phone-number-input"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  maxLength="10"
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">
              Subject:
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Subject</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <div className='teacher-btn-section'>
            <button type="button" className='another-teacher'>
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

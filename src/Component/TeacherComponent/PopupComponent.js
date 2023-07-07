import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { formStore } from '../../Store/TeacherStore/FormStore';
import { teacherStore } from '../../Store/TeacherStore/TeacherStore';
import { RiAddCircleLine } from 'react-icons/ri';
import axios from 'axios';
import InputMask from 'react-input-mask';
import '../../Component/TeacherComponent/PopupStyle.css';
import { validateTeacherForm } from '../../Screen/Teachers/FormTeacherValidator';
import { toJS } from 'mobx';
import sweetAlertConfig from '../Alerts/alertConfig';

const PopupComponent = observer(({ onSubmit, teacherId }) => {
  const { formData, csvFile, showCSVForm } = formStore;


  const handleManuallyFormClick = () => {
    formStore.setShowManuallyForm(true);
  };

  const handleCSVFormClick = () => {
    formStore.setShowManuallyForm(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formStore.setFormData({ ...formStore.formData, [name]: value });
  };

  useEffect(() => {
    if (teacherId) {
      const teacher = teacherStore.getTeacherById(teacherId);

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
    console.log("hello")
    console.log(csvFile)
    console.log(validateTeacherForm())
    if (validateTeacherForm()) {
      const { fullName, username, role, gender, password, phoneNumber, subject } = formData;

      let payload;
      if (toJS(csvFile)) {
        // Send CSV file as payload
        payload = csvFile;
        console.log(payload)
      } else {
        // Send form data as payload
        payload = {
          fullName,
          username,
          role,
          gender,
          password,
          phoneNumber,
          subject,
        };
      }

      if (teacherId) {
        await axios
          .put(`/api/teachers/${teacherId}`, payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            sweetAlertConfig.successAlert("Submit Successfully Form data")
            teacherStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error)
            console.error(error);
          });
      } else {
        await axios
          .post('https://dummy.restapiexample.com/api/v1/create', payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            sweetAlertConfig.successAlert("Submit Successfully Form data")
            teacherStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error)
            console.error(error);
          });
      }
      formStore.resetCSVFile();
      formStore.resetFormData();
      formStore.clearErrors();
    } else {
      formStore.setError('Please fix the following errors:');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (file) {
      // Check the file extension
      const extension = file.name.split('.').pop();
      if (extension !== 'csv') {
        // Display an error message or perform any desired action
        console.log('Please upload a CSV file.');
        return;
      }

      // Perform further processing or upload the file
      // You can access the file using `file` variable
      console.log('File uploaded:', file);
      formStore.setCSVFile(file);
    }
  };

  const handleClose = () => {
    formStore.resetFormData();
    formStore.clearErrors();
    formStore.resetCSVFile();
    teacherStore.setPopupOpen(false);
  };

  const handleAnotherTeacher = () => {
    formStore.resetFormData();
    formStore.clearErrors();
    formStore.resetCSVFile();
  };
  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="teacher-popup-form">
          <h1>Add Teacher</h1>

          <div className="popup-header">
            <button className={`popup-header-button ${formStore.showManuallyForm ? 'active' : ''}`} onClick={handleManuallyFormClick}>
              Manually
            </button>
            <button className={`popup-header-button ${!formStore.showManuallyForm ? 'active' : ''}`} onClick={handleCSVFormClick}>
              Import CSV
            </button>
          </div>
          {
            formStore.showManuallyForm ? (<form onSubmit={handleFormSubmit} >

              <div className="form-row">
                <label className="form-label">
                  Full Name<span className="required-field">*</span>
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
                  Username<span className="required-field">*</span>
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
                  Password<span className="required-field">*</span>
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
                  Phone<span className="required-field">*</span>
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
                  Gender<span className="required-field">*</span>
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
                  Subject<span className="required-field">*</span>
                  <select name="subject" value={formData.subject} onChange={handleInputChange} required className='select-input'>
                    <option value="">Select Subject</option>
                    <option value="female">Math</option>
                  </select>
                  {formStore.errors.subject && (
                    <div className="error-message">{toJS(formStore.errors).subject}</div>
                  )}

                </label>
              </div>
              <div className="teacher-btn-section">
                <button type="button" className="another-teacher" onClick={handleAnotherTeacher}>
                  <RiAddCircleLine />
                  Add Another
                </button>
                <button type="submit" className="add-teacher">
                  Add Teacher
                </button>
              </div>
            </form>) : (
              <form onSubmit={handleFormSubmit}>
                
                <label className="form-file-label">
                 <div>Upload CSV <span className="required-field">*</span></div> 
                 <div className='hhh'>
                 <div className="custom-file-input">
                    <input
                      type="file"
                      name="csvFile"
                      accept=".csv"
                      className="file-input"
                      onChange={handleFileInputChange}
                      required={showCSVForm}
                    />
                    Upload file...
                  </div>
                  <span className="file-name">{csvFile ? csvFile.name : 'No file selected'}</span>
                 </div>
                  
                  {formStore.errors.file && (
                    <div className="error-message">{toJS(formStore.errors).file}</div>
                  )}
                
         </label>
                <div className="form-row">
                  <div className="teacher-btn-section">
                    <button type="button" className="another-teacher" onClick={handleAnotherTeacher}>
                      <RiAddCircleLine />
                      Add Another
                    </button>
                    <button type="submit" className="add-teacher">
                      Add Teacher
                    </button>
                  </div>
                </div>
              </form>
            )
          }
        </div>
      </div>
    </div>
  );
});

export default PopupComponent;



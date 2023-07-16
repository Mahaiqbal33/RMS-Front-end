
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { StudentStore } from '../../Store/studentStore/studentStore';
import { RiAddCircleLine } from 'react-icons/ri';
import InputMask from 'react-input-mask';
import '../../Component/Students/studentPopup.css';
import { validateStudentForm } from '../../helper.js/formStudentValidator';
import { toJS } from 'mobx';
import sweetAlertConfig from '../Alerts/alertConfig';
import { FormStore } from '../../Store/studentStore/formStore';
import { SC } from '../../Services/serverCall';

const StudentPopup = observer(({ onSubmit, studentId }) => {
  const { formData, csvFile, showCSVForm } = FormStore;


  const handleManuallyFormClick = () => {
    FormStore.setShowManuallyForm(true);
  };

  const handleCSVFormClick = () => {
    FormStore.setShowManuallyForm(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    FormStore.setFormData({ ...FormStore.formData, [name]: value });
  };
  
  useEffect(() => {
    if (studentId) {
      const student = StudentStore.getStudentById(studentId);
      console.log(student.gender);
      FormStore.setFormData({
        name: student.name,
        username: student.username,
        role: student.role,
        gender: student.gender,
        password: student.password,
        phone_number: student.phone_number,
        class_name: student.class_name,
        batch: student.batch
      });
    } else {
      FormStore.resetFormData(); 
    }
  }, [studentId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("hello")
    console.log(csvFile)
    console.log("validatore",validateStudentForm())
    if (validateStudentForm()) {
      const { name, username, role, gender, password, phone_number, class_name, batch } = formData;

      let payload;
      if (toJS(csvFile)) {
        // Send CSV file as payload
        payload = csvFile;
        console.log(payload)
      } else {
        // Send form data as payload
       
        payload = {
          name,
          username,
          role,
          gender,
          password,
          phone_number,
          class_name,
          batch
        };
      }

      if (studentId) {
        await
          SC.putCall(`/student/${studentId}`, payload)
            .then((response) => {
              console.log(response.data.data);
              onSubmit();
              sweetAlertConfig.successAlert("Submit Successfully Form data")
              StudentStore.setPopupOpen(false);
            })
            .catch((error) => {
              sweetAlertConfig.errorAlert(error)
              console.error(error);
              console.log(studentId)
            });

      } else {
        await
          SC.postCall('/student', payload)
            .then((response) => {
              console.log("response.data");
              onSubmit();
              sweetAlertConfig.successAlert("Submit Successfully Form data")
              StudentStore.setPopupOpen(false);
            })
            .catch((error) => {
              sweetAlertConfig.errorAlert(error)
              console.error(error);
            });
      }
      FormStore.resetCSVFile();
      FormStore.resetFormData();
      FormStore.clearErrors();
    } else {
      FormStore.setError('Please fix the following errors:');
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
      FormStore.setCSVFile(file);
    }
  };

  const handleClose = () => {
    FormStore.setShowManuallyForm(true);
    FormStore.resetFormData();
    FormStore.clearErrors();
    FormStore.resetCSVFile();
    StudentStore.setPopupOpen(false);
  };

  const handleAnotherStudent = () => {
    FormStore.resetFormData();
    FormStore.clearErrors();
    FormStore.resetCSVFile();
  };
  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="student-popup-form">
          <h1>Add Student</h1>

          <div className="popup-header">
            <button className={`popup-header-button ${FormStore.showManuallyForm ? 'active' : ''}`} onClick={handleManuallyFormClick}>
              Manually
            </button>
            <button className={`popup-header-button ${!FormStore.showManuallyForm ? 'active' : ''}`} onClick={handleCSVFormClick}>
              Import CSV
            </button>
          </div>
          {
            FormStore.showManuallyForm ? (<form onSubmit={handleFormSubmit} >

              <div className="form-row">
                <label className="form-label">
                  Full Name<span className="required-field">*</span>
                  <input type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required />
                  {FormStore.errors.name && (
                    <div className="error-message">{toJS(FormStore.errors).name}</div>
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
                  {FormStore.errors.username && (
                    <div className="error-message">{toJS(FormStore.errors).username}</div>
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
                    {FormStore.errors.password && (
                      <div className="error-message">
                        {toJS(FormStore.errors).password}
                      </div>
                    )}
                  </label>
                <label className="form-label">
                  Phone<span className="required-field">*</span>
                  <InputMask
                    mask="+929999999999"
                    maskChar=" "
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                  {FormStore.errors.phone_number && (
                    <div className="error-message">{toJS(FormStore.errors).phone_number}</div>
                  )}

                </label>
              </div>
              <div className="form-row">
                <label className="form-label">
                  Gender<span className="required-field">*</span>
                  <select name="gender" className="form-input" value={formData.gender} onChange={handleInputChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {FormStore.errors.gender && (
                    <div className="error-message">{toJS(FormStore.errors).gender}</div>
                  )}

                </label>
                <label className="form-label">
                  Class<span className="required-field">*</span>
                  <select name="class_name" value={formData.class_name} onChange={handleInputChange} required className='select-input'>
                    <option value="">Select Class</option>
                    <option value="1st-Year">1st-Year</option>
                    <option value="2nd-Year">2nd-Year</option>
                  </select>
                  {FormStore.errors.class_name && (
                    <div className="error-message">{toJS(FormStore.errors).class_name}</div>
                  )}
                </label>
              </div>
              <div className="form-row">
                <label className="form-label">
                  Batch<span className="required-field">*</span>
                  <input type="text"
                    name="batch"
                    value={formData.batch}
                    onChange={handleInputChange}
                    maxLength={4} // Limit input to 4 characters
                    pattern="\d{4}" // Enforce 4-digit format
                    required />
                  {FormStore.errors.batch && (
                    <div className="error-message">{toJS(FormStore.errors).batch}</div>
                  )}

                </label>
              </div>

              <div className="student-btn-section">
                <button type="button" className="another-student" onClick={handleAnotherStudent}>
                  <RiAddCircleLine />
                  Add Another
                </button>
                <button type="submit" className="add-student">
                  Add Student
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

                  {FormStore.errors.file && (
                    <div className="error-message">{toJS(FormStore.errors).file}</div>
                  )}

                </label>
                <div className="form-row">
                  <div className="student-btn-section">
                    <button type="button" className="another-student" onClick={handleAnotherStudent}>
                      <RiAddCircleLine />
                      Add Another
                    </button>
                    <button type="submit" className="add-student">
                      Add Student
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

export default StudentPopup;

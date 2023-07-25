import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { formStore } from '../../Store/TeacherStore/FormStore';
import { teacherStore } from '../../Store/TeacherStore/TeacherStore';
import { RiAddCircleLine } from 'react-icons/ri';
import axios from 'axios';
import InputMask from 'react-input-mask';
import '../Style/PopupStyle.css';
import { validateTeacherForm } from '../../helper.js/FormTeacherValidator';
import { toJS } from 'mobx';
import sweetAlertConfig from '../Alerts/alertConfig';
import { subjectformStore } from '../../Store/SubjectsStore/SubjectsFormStore';
import { SC } from '../../Services/serverCall';


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
    subjectformStore.fetchSubjectList();
    if (teacherId) {
      const teacher = teacherStore.getTeacherById(teacherId);
      formStore.setFormData({
        fullName: teacher.name,
        username: teacher.email,
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
    await  formStore.filtersubject_id()
    console.log("Form validtions",validateTeacherForm())
    if (validateTeacherForm(teacherId)) {
      const { fullName, username, gender, password, phoneNumber, subject_id} = formData;
       let endpoint;
      let payload;
      if (toJS(csvFile)) {
        // Send CSV file as payload
         // Send CSV file as payload
        endpoint = "/teachers/bulk-updates";
        payload = csvFile;
        console.log(payload)
      } else {
        // Send form data as payload
        endpoint = "/teachers";
        payload = {
          name:fullName,
          gender:gender,
          username:username,
          password:password,
          phone_number:phoneNumber,
          subject_id:subject_id,
        };
        if(!teacherId){
         payload.password=password
        }
      }

      if (teacherId) {
        await axios
          .put(`/teachers/${teacherId}`, payload)
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
        await SC.postCall(endpoint, payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            sweetAlertConfig.successAlert("Submit Successfully Form data")
            teacherStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error.message)
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
    formStore.setShowManuallyForm(true);
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
        <div className="popup-form">
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
                <label className="form-label" htmlFor="fullName">
                  Full Name<span className="required-field">*</span>
                  <input type="text"
                    id='fullName'
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    autoComplete='on'
                    required />
                  {formStore.errors.fullName && (
                    <div className="error-message">{toJS(formStore.errors).fullName}</div>
                  )}

                </label>
                <label className="form-label" htmlFor='username'>
                  Username<span className="required-field">*</span>
                  <InputMask
                    mask="9999-FAST-9999"
                    maskChar=" "
                    type="text"
                    id='username'
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    autoComplete='on'
                    required
                  />
                  {formStore.errors.username && (
                    <div className="error-message">{toJS(formStore.errors).username}</div>
                  )}

                </label>
              </div>
              <div className="form-row" htmlFor="password">
                {!teacherId&&
                  <label className="form-label">
                  Password<span className="required-field">*</span>
                  <input
                    type="password"
                    name="password"
                    id='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete='on'
                    required
                  />
                  {formStore.errors.password && (
                    <div className="error-message">{toJS(formStore.errors).password}</div>
                  )}

                </label>
                }
                <label className="form-label" htmlFor='phoneNumber'>
                  Phone<span className="required-field">*</span>
                  <InputMask
                    mask="+929999999999"
                    maskChar=" "
                    type="tel"
                    id='phoneNumber'
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    autoComplete='on'
                    required
                  />
                  {formStore.errors.phoneNumber && (
                    <div className="error-message">{toJS(formStore.errors).phoneNumber}</div>
                  )}

                </label>
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor='gender'>
                  Gender<span className="required-field">*</span>
                  <select name="gender" id='gender'   autoComplete='on' className="form-input" value={formData.gender} onChange={handleInputChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {formStore.errors.gender && (
                    <div className="error-message">{toJS(formStore.errors).gender}</div>
                  )}

                </label>
                <label className="form-label" htmlFor='subject'>
                    Subject<span className="required-field">*</span>
                    <select
                      name="subject"
                      id='subject'
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="select-input"
                      autoComplete='on'
                    >
                      <option value="">Select Subject</option>
                      {subjectformStore.subjectList.map((subject) => (
                        <option key={subject.id} value={subject.name}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                    {subjectformStore.errors.subject && (
                      <div className="error-message">{toJS(subjectformStore.errors).subject}</div>
                    )}
                  </label>
              </div>
              <div className="popup-btn-section">
                <button type="button" className="another-popup" onClick={handleAnotherTeacher}>
                  <RiAddCircleLine />
                  Add Another
                </button>
                <button type="submit" className="add-popup">
                  Add Teacher
                </button>
              </div>
            </form>) : (
              <form onSubmit={handleFormSubmit}>
                
                <label className="form-file-label" htmlFor='csvFile'>
                 <div>Upload CSV <span className="required-field">*</span></div> 
                 <div>
                 <div className="custom-file-input">
                    <input
                      type="file"
                      name="csvFile"
                      accept=".csv"
                      id='csvFile'
                      className="file-input"
                      onChange={handleFileInputChange}
                      required={showCSVForm}
                      autoComplete='off'
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
                  <div className="popup-btn-section">
                    <button type="button" className="another-popup" onClick={handleAnotherTeacher}>
                      <RiAddCircleLine />
                      Add Another
                    </button>
                    <button type="submit" className="add-popup">
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



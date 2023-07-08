import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { subjectsStore } from '../../Store/SubjectsStore/SubjectsStore';
import "./SubjectPopupStyle.css"
import { RiAddCircleLine } from 'react-icons/ri';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { toJS } from 'mobx';
import sweetAlertConfig from '../Alerts/alertConfig';
import { subjectformStore } from '../../Store/SubjectsStore/SubjecsFormStore';

const Subjectpopup = observer(({ onSubmit, subjectId }) => {
  const { formData } = subjectformStore;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    subjectformStore.setFormData({ ...subjectformStore.formData, [name]: value });
  };
   // Call fetchUserList when the component is mounted

  useEffect(() => {
    if (subjectId) {
      const subject = subjectsStore.getsubjectById(subjectId);

      subjectformStore.setFormData({
        username: subject.username,
        userId: subject.userId,
        subject: subject.subject,
      });
    } else {
      subjectformStore.resetFormData();
    }
  }, [subjectId]);

  useEffect(() => {
    subjectformStore.fetchUserList();
  }, []);

  const handleFormSubmit = async (e) => {
    subjectformStore.filterUserId();
    e.preventDefault();
    let arr = true;
    if (arr) {
      const { username, userId, subject } = formData;

      const payload = {
        userId,
        username,
        subject,
      };

      if (subjectId) {
        await axios
          .put(`/api/subjects/${subjectId}`, payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            sweetAlertConfig.successAlert("Submit Successfully Form data")
            subjectsStore.setPopupOpen(false);
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
            subjectsStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error)
            console.error(error);
          });
      }
      subjectformStore.resetFormData();
      subjectformStore.clearErrors();
    } else {
      subjectformStore.setError('Please fix the following errors:');
    }
  };

  const handleClose = () => {
    subjectformStore.resetFormData();
    subjectformStore.clearErrors();
    subjectsStore.setPopupOpen(false);
  };

  const handleAnothersubject = () => {
    subjectformStore.resetFormData();
    subjectformStore.clearErrors();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="subject-popup-form">
          <h1>Add subject</h1>

          <form onSubmit={handleFormSubmit}>
            <div className="form-row">
              <label className="form-label">
                Username<span className="required-field">*</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                {subjectformStore.errors.username && (
                  <div className="error-message">{toJS(subjectformStore.errors).username}</div>
                )}
              </label>
              <label className="form-label">
                Subject<span className="required-field">*</span>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className='select-input'
                >
                  <option value="">Select Subject</option>
                  <option value="Math">Math</option>
                </select>
                {subjectformStore.errors.subject && (
                  <div className="error-message">{toJS(subjectformStore.errors).subject}</div>
                )}
              </label>
            </div>
            <div className="subject-btn-section">
              <button type="button" className="another-subject" onClick={handleAnothersubject}>
                <RiAddCircleLine />
                Add Another
              </button>
              <button type="submit" className="add-subject">
                Add subject
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default Subjectpopup;

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { subjectsStore } from '../../Store/SubjectsStore/SubjectsStore';
import '../Style/PopupStyle.css';
import { RiAddCircleLine } from 'react-icons/ri';
import axios from 'axios';
import { SC } from '../../Services/serverCall';
import { validateSubjectForm } from '../../helper.js/FormSubjectValidator';
import InputMask from 'react-input-mask';
import { toJS } from 'mobx';
import sweetAlertConfig from '../Alerts/alertConfig';
import { subjectformStore } from '../../Store/SubjectsStore/SubjectsFormStore';
import SubjectCombination from './SubjectCombinationForm';

const Subjectpopup = observer(({ onSubmit, subjectId }) => {
  const { formData } = subjectformStore;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    subjectformStore.setFormData({ ...subjectformStore.formData, [name]: value });
  
  };
  // Call fetchSubjectList when the component is mounted

  useEffect(() => {
    if (subjectId) {
      subjectformStore.setFormData({
        username: subjectId.username,
      });
    } else {
      subjectformStore.resetFormData();
    }
  }, [subjectId]);

  useEffect(() => {
    subjectformStore.fetchSubjectList();
  }, []);
  
  const handleSubjectCobinationFormClick = () => {
    subjectformStore.setShowSubjectsCombinationForm(true);
  };

  const handleCSVFormClick = () => {
    subjectformStore.setShowSubjectsCombinationForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  await  subjectformStore.filtersubject_id();
  await  subjectformStore.filterstudent_id();
    console.log("Search for Username1:", formData.username);
    if (validateSubjectForm()) {
      const {  student_id, subject_id } = formData;
      const payload = {
        student_id,
        subject_id,
      };

      if (subjectId) {
        await axios
          .put(`/student-subjects${subjectId}`, payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            sweetAlertConfig.successAlert("Submit Successfully Form data")
            subjectsStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error.message)
            console.error(error);
          });
      } else {
        await SC.postCall('/student-subjects', payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            sweetAlertConfig.successAlert("Submit Successfully Form data")
            subjectsStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error.message)
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
        <div className="popup-form">
          <h1>Add subject</h1>
          <div className="popup-header">
            <button className={`popup-header-button ${subjectformStore.showSubjectsCombinationForm ? 'active' : ''}`} onClick={handleSubjectCobinationFormClick}>
              Add Subjects
            </button>
            <button className={`popup-header-button ${!subjectformStore.showSubjectsCombinationForm ? 'active' : ''}`} onClick={handleCSVFormClick}>
              Student Subjects
            </button>
          </div>
          {
            subjectformStore.showSubjectsCombinationForm ? (<SubjectCombination />) : (
              <form onSubmit={handleFormSubmit}>
                <div className="form-row">
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
                    {subjectformStore.errors.username && (
                      <div className="error-message">{toJS(subjectformStore.errors).username}</div>
                    )}
                  </label>
                  <label className="form-label" htmlFor='subject'>
                    Subject<span className="required-field">*</span>
                    <select
                      name="subject"
                      id='subject'
                      value={formData.subject}
                      onChange={handleInputChange}
                      autoComplete='on'
                      required
                      className="select-input"
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
                  <button type="button" className="another-popup" onClick={handleAnothersubject}>
                    <RiAddCircleLine />
                    Add Another
                  </button>
                  <button type="submit" className="add-popup">
                    Add subject
                  </button>
                </div>
              </form>
            )
          }

        </div>
      </div>
    </div>
  );
});

export default Subjectpopup;

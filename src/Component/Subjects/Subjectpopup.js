import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { subjectsStore } from '../../Store/SubjectsStore/SubjectsStore';
import "./SubjectPopupStyle.css"
import { RiAddCircleLine } from 'react-icons/ri';
import axios from 'axios';
import { SC } from '../../Services/serverCall';
import { validateSubjectForm } from '../../helper.js/FormSubjectValidator';
import InputMask from 'react-input-mask';
import { StudentStore } from '../../Store/studentStore/studentStore';
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
      const student = subjectsStore.filterstudent_id(subjectId);
      const subject = subjectsStore.filtersubject_id(subjectId);
      subjectformStore.setFormData({
        username: subject.username,
      });
    } else {
      subjectformStore.resetFormData();
    }
  }, [subjectId]);

  useEffect(() => {
    subjectformStore.fetchSubjectList();
    StudentStore.fetchStudents();
  }, []);
  
  const handleSubjectCobinationFormClick = () => {
    subjectformStore.setShowSubjectsCombinationForm(true);
  };

  const handleCSVFormClick = () => {
    subjectformStore.setShowSubjectsCombinationForm(false);
  };

  const handleFormSubmit = async (e) => {
    subjectformStore.filterstudent_id();
    subjectformStore.filtersubject_id();
    e.preventDefault();

    if (validateSubjectForm()) {
      const {  student_id, subject_id } = formData;

      const payload = {
        student_id,
        subject_id,
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
        await SC.postCall('/student_subjects', payload)
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
                  {subjectformStore.errors.student_id && (
                    <div className="error-message">{toJS(subjectformStore.errors).student_id}</div>
                  )}
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
            )
          }

        </div>
      </div>
    </div>
  );
});

export default Subjectpopup;

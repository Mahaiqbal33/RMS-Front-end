import React from 'react';
import { observer } from 'mobx-react';
import { subjectCombinationStore } from '../../Store/SubjectsStore/SubjectCombinationStore';
import { subjectsStore } from '../../Store/SubjectsStore/SubjectsStore';
import "./SubjectPopupStyle.css"
import { RiAddCircleLine } from 'react-icons/ri';
import axios from 'axios';
import { validateSubjectCombinatinForm } from '../../helper.js/SubjectCombinationValidators';
import InputMask from 'react-input-mask';
import { toJS } from 'mobx';
import sweetAlertConfig from '../Alerts/alertConfig';

const SubjectCombination = observer(() => {
  const { formData } = subjectCombinationStore;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    subjectCombinationStore.setFormData({ ...subjectCombinationStore.formData, [name]: value });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateSubjectCombinatinForm()) {
      const { name, course_code } = formData;

      const payload = {
        name,
        course_code ,
      };

      try {
        await axios.post('http://127.0.0.1:3333/api/v1/subject', payload);
        sweetAlertConfig.successAlert("Successfully submitted the form data");
        subjectsStore.setPopupOpen(false);
      } catch (error) {
        sweetAlertConfig.errorAlert(error);
        console.error(error);
      }

      subjectCombinationStore.resetFormData();
      subjectCombinationStore.clearErrors();
    }
  };


  const handleAnotherSubject = () => {
    subjectCombinationStore.resetFormData();
    subjectCombinationStore.clearErrors();
  };

  return (

    <form onSubmit={handleFormSubmit}>
      <div className="form-row">
        <label className="form-label">
          Subject<span className="required-field">*</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {subjectCombinationStore.errors.name && (
            <div className="error-message">{toJS(subjectCombinationStore.errors).name}</div>
          )}
        </label>
        <label className="form-label">
          Course Code<span className="required-field">*</span>
          <input
            type="text"
            name="course_code"
            value={formData.course_code }
            onChange={handleInputChange}
            required
          />
          {subjectCombinationStore.errors.course_code  && (
            <div className="error-message">{toJS(subjectCombinationStore.errors).course_code }</div>
          )}
        </label>
      </div>
      <div className="subject-btn-section">
        <button type="button" className="another-subject" onClick={handleAnotherSubject}>
          <RiAddCircleLine />
          Add Another
        </button>
        <button type="submit" className="add-subject">
          Add subject
        </button>
      </div>
    </form>


  );
});

export default SubjectCombination;

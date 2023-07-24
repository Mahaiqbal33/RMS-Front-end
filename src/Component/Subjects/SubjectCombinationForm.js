import React from 'react';
import { observer } from 'mobx-react';
import { subjectCombinationStore } from '../../Store/SubjectsStore/SubjectCombinationStore';
import { subjectsStore } from '../../Store/SubjectsStore/SubjectsStore';
import '../Style/PopupStyle.css';
import { RiAddCircleLine } from 'react-icons/ri';
import { validateSubjectCombinatinForm } from '../../helper.js/SubjectCombinationValidators';
import { toJS } from 'mobx';
import sweetAlertConfig from '../Alerts/alertConfig';
import { SC } from '../../Services/serverCall';

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
        await SC.postCall('/subject', payload);
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
        <label className="form-label" htmlFor='name'>
          Subject<span className="required-field">*</span>
          <input
            type="text"
            name="name"
            id='name'
            value={formData.name}
            onChange={handleInputChange}
            autoComplete='on'
            required
          />
          {subjectCombinationStore.errors.name && (
            <div className="error-message">{toJS(subjectCombinationStore.errors).name}</div>
          )}
        </label>
        <label className="form-label" htmlFor='course_code'>
          Course Code<span className="required-field">*</span>
          <input
            type="text"
            name="course_code"
            id='course_code'
            value={formData.course_code }
            onChange={handleInputChange}
            autoComplete='on'
            required
          />
          {subjectCombinationStore.errors.course_code  && (
            <div className="error-message">{toJS(subjectCombinationStore.errors).course_code }</div>
          )}
        </label>
      </div>
      <div className="popup-btn-section">
        <button type="button" className="another-popup" onClick={handleAnotherSubject}>
          <RiAddCircleLine />
          Add Another
        </button>
        <button type="submit" className="add-popup">
          Add subject
        </button>
      </div>
    </form>


  );
});

export default SubjectCombination;

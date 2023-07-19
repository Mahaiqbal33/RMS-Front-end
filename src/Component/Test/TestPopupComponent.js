import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { formStore } from "../../Store/TestStore/TestFormStore";
import { testStore } from '../../Store/TestStore/TestStore';
import { RiAddCircleLine } from 'react-icons/ri';
import InputMask from 'react-input-mask';
import { subjectformStore } from '../../Store/SubjectsStore/SubjectsFormStore';
import { SC } from '../../Services/serverCall';
import '../Style/PopupStyle.css';
import { toJS } from 'mobx';
import sweetAlertConfig from '../Alerts/alertConfig';

const TestPopupComponent = observer(({ onSubmit, testId }) => {
  const { formData } = formStore;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formStore.setFormData({ ...formStore.formData, [name]: value });
  };

  useEffect(() => {
    subjectformStore.fetchSubjectList();
    if (testId) {
      const test = testStore.gettestById(testId);
      formStore.setFormData({
        subject:test.subject,
        name:test.name,
        totalMarks:test.marks,
        className:test.class,
      });
    } else {
      formStore.resetFormData();
    }
  }, [testId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await  formStore.filtersubject_id()
    let arr = true;
    if (arr) {
      const { subject_id, name, totalMarks, className } = formData;

      const payload = {
        subject_id,
        name,
        marks: totalMarks,
        class_name: className,
      };

      if (testId) {
        await SC.putCall(`/attempt/${testId}`, payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            sweetAlertConfig.successAlert("Submit Successfully Form data")
            testStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error)
            console.error(error);
          });
      } else {
        await SC.postCall('/attempt', payload)
          .then((response) => {
            console.log(response.data);
            onSubmit();
            sweetAlertConfig.successAlert("Submit Successfully Form data")
            testStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error)
            console.error(error);
          });
      }
      formStore.resetFormData();
      formStore.clearErrors();
    } else {
      formStore.setError('Please fix the following errors:');
    }
  };

  const handleClose = () => {
    formStore.resetFormData();
    formStore.clearErrors();
    testStore.setPopupOpen(false);
  };

  const handleAnothertest = () => {

    formStore.resetFormData();
    formStore.clearErrors();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="test-popup-form">
          <h1>Add Test</h1>

          <form onSubmit={handleFormSubmit}>
            <div className="form-row">
              <label className="form-label">
                Subject Name<span className="required-field">*</span>
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
                {formStore.errors.subject && (
                  <div className="error-message">{toJS(formStore.errors).subject}</div>
                )}
              </label>
              <label className="form-label">
                Test name<span className="required-field">*</span>

                <InputMask
                  mask="99-aaaa-T9"
                  maskChar="_"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              {formStore.errors.name && (
                <div className="error-message">{toJS(formStore.errors).name}</div>
              )}
            </label>
        </div>
        <div className="form-row">
          <label className="form-label">
            Total Marks<span className="required-field">*</span>
            <input
              type="text"
              name="totalMarks"
              value={formData.totalMarks}
              onChange={handleInputChange}
              required
            />
            {formStore.errors.totalMarks && (
              <div className="error-message">{toJS(formStore.errors).totalMarks}</div>
            )}
          </label>
          <label className="form-label">
            Class Name<span className="required-field">*</span>
            <select name="className" value={formData.className} onChange={handleInputChange} required className='select-input'>
              <option value="">Select Class</option>
              <option value="1st-Year">1st-Year</option>
              <option value="2nd-Year">2nd-Year</option>
            </select>
            {formStore.errors.className && (
              <div className="error-message">{toJS(formStore.errors).className}</div>
            )}
          </label>
        </div>
        <div className="popup-btn-section">
          <button type="button" className="another-popup" onClick={handleAnothertest}>
            <RiAddCircleLine />
            Add Another
          </button>
          <button type="submit" className="add-popup">
            Add Test
          </button>
        </div>
      </form>
    </div>
      </div >
    </div >
  );
});

export default TestPopupComponent;

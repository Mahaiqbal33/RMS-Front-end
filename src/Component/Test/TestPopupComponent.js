import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { formStore } from "../../Store/TestStore/TestFormStore";
import { testStore } from '../../Store/TestStore/TestStore';
import { RiAddCircleLine } from 'react-icons/ri';
import axios from 'axios';
import "./PopupStyle.css"
import { toJS } from 'mobx';
import sweetAlertConfig from '../Alerts/alertConfig';

const TestPopupComponent = observer(({ onSubmit, testId }) => {
  const { formData } = formStore;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formStore.setFormData({ ...formStore.formData, [name]: value });
  };

  useEffect(() => {
    if (testId) {
      const test = testStore.gettestById(testId);

      formStore.setFormData({
        subject: test.subject,
        testDate: test.testDate,
        totalMarks: test.totalMarks,
        courseCode: test.courseCode,
        className: test.className,
      });
    } else {
      formStore.resetFormData();
    }
  }, [testId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  let arr=true;
    if (arr) {
      const { subject, testDate, totalMarks, courseCode, className } = formData;

      const payload = {
        subject,
        testDate,
        totalMarks,
        courseCode,
        className,
      };

      if (testId) {
        await axios
          .put(`/api/tests/${testId}`, payload)
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
        await axios
          .post('https://dummy.restapiexample.com/api/v1/create', payload)
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
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
                {formStore.errors.subject && (
                  <div className="error-message">{toJS(formStore.errors).subject}</div>
                )}
              </label>
              <label className="form-label">
                  Test Date<span className="required-field">*</span>
                  <input
                    type="text"
                    name="testDate"
                    value={formData.testDate}
                    onChange={handleInputChange}
                    required
                  />
                  {formStore.errors.testDate && (
                    <div className="error-message">{toJS(formStore.errors).testDate}</div>
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
                  Course Code<span className="required-field">*</span>
                  <input
                    type="text"
                    name="courseCode"
                    value={formData.courseCode}
                    onChange={handleInputChange}
                    required
                  />
                  {formStore.errors.courseCode && (
                    <div className="error-message">{toJS(formStore.errors).courseCode}</div>
                  )}
                </label>
            </div>
            <div className="form-row">
            
                <label className="form-label">
                  Class Name<span className="required-field">*</span>
                  <input
                    type="text"
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    required
                  />
                  {formStore.errors.className && (
                    <div className="error-message">{toJS(formStore.errors).className}</div>
                  )}
                </label>
            </div>
            <div className="test-btn-section">
              <button type="button" className="another-test" onClick={handleAnothertest}>
                <RiAddCircleLine />
                Add Another
              </button>
              <button type="submit" className="add-test">
                Add Test
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default TestPopupComponent;

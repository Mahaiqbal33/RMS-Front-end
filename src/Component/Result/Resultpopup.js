import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { resultStore } from '../../Store/ResultStore/ResultStore';
import '../Style/PopupStyle.css';
import { RiAddCircleLine } from 'react-icons/ri';
import axios from 'axios';
import { FormResultValidator } from '../../helper.js/FormResultValidators';
import InputMask from 'react-input-mask';
import { toJS } from 'mobx';
import sweetAlertConfig from '../Alerts/alertConfig';
import { resultformStore } from '../../Store/ResultStore/ResultFormStore';
import { SC } from '../../Services/serverCall';

const Resultpopup = observer(({ resultId }) => {
  const { formData } = resultformStore;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    resultformStore.setFormData({ ...resultformStore.formData, [name]: value });
  };

  useEffect(() => {
    if (resultId) {
      const result = resultStore.getresultById(resultId);
      resultformStore.setFormData({
        username: result.username,
        testname: result.testname,
        obtainMarks: result.obtainMarks,
      });
    } else {
      resultformStore.resetFormData();
    }
  }, [resultId]);



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await resultformStore.filterstudent_id();
    await resultformStore.filtertest_id();

     let arr=true
    if (arr) {
      const { student_id, attempt_id, obtainMarks } = formData;

      const payload = {
        student_id,
        attempt_id,
        obt_marks:obtainMarks,
      };

      if (resultId) {
        await axios
          .put(`/api/results/${resultId}`, payload)
          .then((response) => {
            console.log(response.data);
            sweetAlertConfig.successAlert("Submit Successfully Form data")
            resultStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error)
            console.error(error);
          });
      } else {
        await SC.postCall('/assessment', payload)
          .then((response) => {
            console.log(response.data);
            sweetAlertConfig.successAlert("Submit Successfully Form data")
            resultStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error.message)
            console.error(error.message);
          });
      }
      resultformStore.resetFormData();
      resultformStore.clearErrors();
    } else {
      resultformStore.setError('Please fix the following errors:');
    }
  };

  const handleClose = () => {
    resultformStore.resetFormData();
    resultformStore.clearErrors();
    resultStore.setPopupOpen(false);
  };

  const handleAnotherresult = () => {
    resultformStore.resetFormData();
    resultformStore.clearErrors();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="popup-form">
          <h1>Add result</h1>
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
                  required
                />
                {resultformStore.errors.username && (
                  <div className="error-message">{toJS(resultformStore.errors).username}</div>
                )}
              </label>
              <label className="form-label" htmlFor='testname'>
                Test Name<span className="required-field">*</span>
                 <InputMask
                  mask="99-aaaa-T9"
                  maskChar="_"
                  id='testname'
                  name="testname"
                  value={formData.testname}
                  onChange={handleInputChange}
                />
                {resultformStore.errors.testname && (
                  <div className="error-message">{toJS(resultformStore.errors).testname}</div>
                )}
              </label>
              <label className="form-label" htmlFor='obtainMarks'>
                Obtain Marks<span className="required-field">*</span>
                <input
                  type="text"
                  name="obtainMarks"
                  id='obtainMarks'
                  value={formData.obtainMarks}
                  onChange={handleInputChange}
                  required
                />
                {resultformStore.errors.obtainMarks && (
                  <div className="error-message">{toJS(resultformStore.errors).obtainMarks}</div>
                )}
              </label>
            </div>
            <div className="popup-btn-section">
              <button type="button" className="another-popup" onClick={handleAnotherresult}>
                <RiAddCircleLine />
                Add Another
              </button>
              <button type="submit" className="add-popup">
                Add result
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default Resultpopup;

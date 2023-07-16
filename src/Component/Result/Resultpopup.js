import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { resultStore } from '../../Store/ResultStore/ResultStore';
import './ResultPopup.css'
import { RiAddCircleLine } from 'react-icons/ri';
import axios from 'axios';
import { FormResultValidator } from '../../helper.js/FormResultValidators';
import InputMask from 'react-input-mask';
import { toJS } from 'mobx';
import sweetAlertConfig from '../Alerts/alertConfig';
import { resultformStore } from '../../Store/ResultStore/ResultFormStore';

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

  useEffect(() => {
    resultformStore.fetchUserList();
  }, []);

  const handleFormSubmit = async (e) => {
    resultformStore.filterUserId();
    e.preventDefault();

    if (FormResultValidator()) {
      const { username,  testname, obtainMarks } = formData;

      const payload = {
        username,
         testname,
        obtainMarks,
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
        await axios
          .post('https://dummy.restapiexample.com/api/v1/create', payload)
          .then((response) => {
            console.log(response.data);
            sweetAlertConfig.successAlert("Submit Successfully Form data")
            resultStore.setPopupOpen(false);
          })
          .catch((error) => {
            sweetAlertConfig.errorAlert(error)
            console.error(error);
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
        <div className="result-popup-form">
          <h1>Add result</h1>
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
                    {resultformStore.errors.username && (
                      <div className="error-message">{toJS(resultformStore.errors).username}</div>
                    )}
                  </label>
                  <label className="form-label">
                    result Name<span className="required-field">*</span>
                    <input
                      type="text"
                      name="testname"
                      value={formData.testname}
                      onChange={handleInputChange}
                      required
                    />
                    {resultformStore.errors.testname && (
                      <div className="error-message">{toJS(resultformStore.errors).testname}</div>
                    )}
                  </label>
                  <label className="form-label">
                    Obtain Marks<span className="required-field">*</span>
                    <input
                      type="text"
                      name="obtainMarks"
                      value={formData.obtainMarks}
                      onChange={handleInputChange}
                      required
                    />
                    {resultformStore.errors.obtainMarks && (
                      <div className="error-message">{toJS(resultformStore.errors).obtainMarks}</div>
                    )}
                  </label>
                </div>
                <div className="result-btn-section">
                  <button type="button" className="another-result" onClick={handleAnotherresult}>
                    <RiAddCircleLine />
                    Add Another
                  </button>
                  <button type="submit" className="add-result">
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

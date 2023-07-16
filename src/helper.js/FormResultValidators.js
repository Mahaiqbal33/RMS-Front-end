import { resultformStore } from "../Store/ResultStore/ResultFormStore";
export const FormResultValidator = () => {
  const { username, testname, obtainMarks } = resultformStore.formData;

  // Reset errors
  resultformStore.clearErrors();

  // Check if it's a manually filled form
  if (username.trim() === '') {
    resultformStore.setError('username', 'Field is required');
    return false;
  }

  if (testname.trim() === '') {
    resultformStore.setError('testname', 'Field is required');
    return false;
  }

  if (obtainMarks.trim() === '') {
    resultformStore.setError('obtainMarks', 'Field is required');
    return false;
  }

  return true;
};

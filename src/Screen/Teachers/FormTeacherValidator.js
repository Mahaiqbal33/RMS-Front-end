import { toJS } from 'mobx';
import { formStore } from '../../Store/TeacherStore/FormStore';

export const validateTeacherForm = () => {
  const { fullName, username, gender, password, phoneNumber, subject } = formStore.formData;
  
  // Reset errors
  formStore.clearErrors();
  
  // Check if it's a manually filled form
  if (formStore.showManuallyForm) {
  
    if (fullName.trim() === '') {
      formStore.setError('fullName', 'Full Name is required');
      return false;
    }

    if (username.trim() === '') {
      formStore.setError('username', 'Username is required');
      return false;
    }

    if (gender.trim() === '') {
      formStore.setError('gender', 'Gender is required');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValidPassword = passwordRegex.test(password);

    if (!isValidPassword) {
      formStore.setError('password', 'Password should have the first letter capitalized, one special character, and one digit.');
      return false;
    }

    if (password.trim().length < 8) {
      formStore.setError('password', 'Password must be at least 8 characters long');
      return false;
    }

    if (phoneNumber.trim() === '') {
      formStore.setError('phoneNumber', 'Phone Number is required');
      return false;
    }

    if (subject.trim() === '') {
      formStore.setError('subject', 'Subject is required');
      return false;
    }
  } else {
    // CSV file validation

    const csvFile = formStore.csvFile;
    if (csvFile) {
      return true;
    }
    else{
      formStore.setError('file','please upload file')
      return false
    }
  }

  // Proceed with form data submission
  console.log('Form data submitted:', toJS(formStore.formData));
  return true;
};

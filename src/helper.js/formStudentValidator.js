import { toJS } from 'mobx';
import { FormStore } from '../Store/studentStore/formStore';
export const validateStudentForm = () => {
  const { fullName, username, gender, password, phoneNumber,Class,batch} = FormStore.formData;
  
  // Reset errors
  FormStore.clearErrors();
  
  // Check if it's a manually filled form
  if (FormStore.showManuallyForm) {
  
    if (fullName.trim() === '') {
      FormStore.setError('fullName', 'Full Name is required');
      return false;
    }

    if (username.trim() === '') {
      FormStore.setError('username', 'Username is required');
      return false;
    }

    if (gender.trim() === '') {
      FormStore.setError('gender', 'Gender is required');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValidPassword = passwordRegex.test(password);

    if (!isValidPassword) {
      FormStore.setError('password', 'Password should have the first letter capitalized, one special character, and one digit.');
      return false;
    }

    if (password.trim().length < 8) {
      FormStore.setError('password', 'Password must be at least 8 characters long');
      return false;
    }

    if (phoneNumber.trim() === '') {
      FormStore.setError('phoneNumber', 'Phone Number is required');
      return false;
    }
    if (Class.trim() === '') {
      FormStore.setError('class', 'Class is required');
      return false;
    }
    if (batch.trim() === '') {
      FormStore.setError('batch', 'Batch is required');
      return false;
    }
  } else {
    // CSV file validation

    const csvFile = FormStore.csvFile;
    if (csvFile) {
      return true;
    }
    else{
      FormStore.setError('file','please upload file')
      return false
    }
  }

  // Proceed with form data submission
  console.log('Form data submitted:', toJS(FormStore.formData));
  return true;
};
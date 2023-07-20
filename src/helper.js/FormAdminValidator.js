import { toJS } from 'mobx';
import { adminFormStore } from '../Store/AdminStore/AdminForm';
export const validateAdminForm = () => {
  const {  username, password, } = adminFormStore.formData;
  
  // Reset errors
 adminFormStore.clearErrors();
  

    if (username.trim() === '') {
     adminFormStore.setError('username', 'Username is required');
      return false;
    }

  
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValidPassword = passwordRegex.test(password);

    if (!isValidPassword) {
     adminFormStore.setError('password', 'Password should have the first letter capitalized, one special character, and one digit.');
      return false;
    }

    if (password.trim().length < 8) {
     adminFormStore.setError('password', 'Password must be at least 8 characters long');
      return false;
    }

  

  // Proceed with form data submission
  console.log('Form data submitted:', toJS( adminFormStore.formData));
  return true;
};

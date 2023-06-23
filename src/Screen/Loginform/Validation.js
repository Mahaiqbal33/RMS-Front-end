import { authStore } from '../../Store/AuthStore';
export const validateForm = () => {
    if (!authStore.formFields.username || !authStore.formFields.password) {
      authStore.setError ('Please fill in all fields');
      return false;
    }
    if (!authStore.formFields.username) {
      authStore.setError ('Please enter a valid username');
      return false;
    }
    if (authStore.formFields.password.length < 6) {
      authStore.setError ('Password should be at least 6 characters');
      return false;
    }
    authStore.setError ('');
    return true;
  };
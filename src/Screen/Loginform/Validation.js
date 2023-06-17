import { authStore } from '../../Store/AuthStore';
export const validateForm = () => {
    if (!authStore.username || !authStore.password) {
      authStore.errors = 'Please fill in all fields';
      return false;
    }
    if (!authStore.username) {
      authStore.errors = 'Please enter a valid username';
      return false;
    }
    if (authStore.password.length < 6) {
      authStore.errors = 'Password should be at least 6 characters';
      return false;
    }
    authStore.errors = '';
    return true;
  };
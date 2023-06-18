import { action } from 'mobx';
import { authStore } from '../../Store/AuthStore';
export const validateForm = () => {
  if (!authStore.username || !authStore.password) {
    action(() => {
      authStore.errors = 'Please fill in all fields';
    })();
    return false;
  }
  if (!authStore.username) {
    action(() => {
      authStore.errors = 'Please enter a valid username';
    })();
    return false;
  }
  if (authStore.password.length < 6) {
    action(() => {
      authStore.errors = 'Password should be at least 6 characters';
    })();
    return false;
  }
  action(() => {
    authStore.errors = '';
  })();
  return true;
};

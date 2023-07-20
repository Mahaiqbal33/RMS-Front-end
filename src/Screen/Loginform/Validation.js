import { authStore } from '../../Store/LoginStore/AuthStore';

export const validateForm = () => {
  const { username, password, role } = authStore.formFields;
  authStore.setError('username', '');
  authStore.setError('password', '');
  authStore.setError('role', '');

  if (!username) {
    authStore.setError('username', 'Please enter a valid username');
    return false;
  }

  if (!password) {
    authStore.setError('password', 'Please fill in all fields');
    return false;
  } else if (password.length < 8) {
    authStore.setError('password', 'Password should be at least 6 characters');
    return false;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const isValidPassword = passwordRegex.test(password);

  if (!isValidPassword) {
    authStore.setError('password', 'Password should have the first letter capitalized, one special character, and one digit.');
    return false;
  }

  if (!role) {
    authStore.setError('role', 'Please select a role');
    return false;
  }

  return true;
};

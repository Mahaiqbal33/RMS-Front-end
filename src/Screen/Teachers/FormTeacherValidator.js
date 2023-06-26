
import { toJS } from 'mobx';
import { formStore } from '../../Store/FormStore';

export const validateTeacherForm = (formData) => {
  let isValid = true;
  const { fullName, username, className, gender, password, phoneNumber, subject } =formData;

  // Reset errors
  formStore.clearErrors();

  if (fullName.trim() === '') {
    formStore.setError('fullName','Full Name is required');
    isValid = false;
  }

  if (username.trim() === '') {
    formStore.setError('username','Username is required');
    isValid = false;
  }

  if (className.trim() === '') {
    formStore.setError('className','Class is required');
    isValid = false;
  }

  if (gender.trim() === '') {
    formStore.setError("gender",'Gender is required');
    isValid = false;
  }

  if (password.trim().length < 8) {
    formStore.setError('password','Password must be at least 8 characters long');
    isValid = false;
  }

  if (phoneNumber.trim() === '') {
    formStore.setError('phoneNumber','Phone Number is required');
    isValid = false;
  }

  if (subject.trim() === '') {
    formStore.setError("subject",'Subject is required');
    isValid = false;
  }
  console.log(toJS(formStore.errors).phoneNumber)
  return isValid;
};

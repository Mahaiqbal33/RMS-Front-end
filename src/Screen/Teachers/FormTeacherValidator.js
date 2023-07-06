import { toJS } from 'mobx';
import { formStore } from '../../Store/TeacherStore/FormStore';

export const validateTeacherForm = () => {
  const { fullName, username, gender, password, phoneNumber, subject } = formStore.formData;

  // Reset errors
  formStore.clearErrors();

  if (fullName.trim() === '') {
    formStore.setError('fullName','Full Name is required');
    return false;
  }

  if (username.trim() === '') {
    formStore.setError('username','Username is required');
    return false;
  }

 

  if (gender.trim() === '') {
    formStore.setError("gender",'Gender is required');
    return false;
  }

  if (password.trim().length < 8) {
    formStore.setError('password','Password must be at least 8 characters long');
    return false;
  }

  if (phoneNumber.trim() === '') {
    formStore.setError('phoneNumber','Phone Number is required');
    return false;
  }

  if (subject.trim() === '') {
    formStore.setError("subject",'Subject is required');
     
  }
  console.log(toJS(formStore.errors))
  return true ;
};

import { makeObservable, observable, action } from 'mobx';

class FormStore {
  formData = {
    fullName: '',
    username: '',
    role: 'teacher',
    gender: '',
    password: '',
    subject: '',
    phoneNumber: '',
  };

  errors = {
    fullName: '',
    username: '',
    role: 'teacher',
    gender: '',
    password: '',
    subject: '',
    phoneNumber: '',
  };
 showSuccessMessage= false;
 showErrorMessage= false;
  constructor() {
    makeObservable(this, {
      formData: observable,
      errors: observable,
      showSuccessMessage:observable,
      showErrorMessage:observable,
      setFormData: action,
      resetFormData: action,
      setError: action,
      clearErrors: action,
      setShowSuccessMessage:action,
      setShowErrorMessage:action
    });
  }

  setFormData(data) {
    this.formData = data;
  }

  resetFormData() {
    this.formData = {
      fullName: '',
      username: '',
      gender: '',
      password: '',
      subject: '',
      phoneNumber: '',
    };
  }
  setError(fieldName, errorMessage) {
    this.errors[fieldName] = errorMessage;
  }

  clearErrors() {
    this.errors = {
      fullName: '',
      username: '',
      role: '',
      gender: '',
      password: '',
      subject: '',
      phoneNumber: '',
    };
  }

  setShowSuccessMessage(value){
    this.showSuccessMessage= value;
  }
  setShowErrorMessage(value){
    this.showErrorMessage= value;
  }

 
}

export const formStore = new FormStore();

import { makeObservable, observable, action } from 'mobx';

class FormStore {
  formData = {
    fullName: '',
    username: '',
    role: '',
    gender: '',
    password: '',
    subject: '',
    phoneNumber: '',
  };

  errors = {
    fullName: '',
    username: '',
    role: '',
    gender: '',
    password: '',
    subject: '',
    phoneNumber: '',
  };

  constructor() {
    makeObservable(this, {
      formData: observable,
      errors: observable,
      setFormData: action,
      resetFormData: action,
      setError: action,
      clearErrors: action,
    });
  }

  setFormData(data) {
    this.formData = data;
  }

  resetFormData() {
    this.formData = {
      fullName: '',
      username: '',
      role: '',
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

 
}

export const formStore = new FormStore();

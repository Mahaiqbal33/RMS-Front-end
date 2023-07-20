import { makeObservable, observable, action } from 'mobx';

class AdminForm {
  formData = {
    username: '',
    password: '',
  };

  errors = {
    username: '',
    password: '',
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
      username: '',
      password: '',
    };
  }

  setError(fieldName, errorMessage) {
    this.errors[fieldName] = errorMessage;
  }

  clearErrors() {
    this.errors = {
      username: '',
      password: '',
    };
  }

}

export const adminFormStore = new AdminForm();

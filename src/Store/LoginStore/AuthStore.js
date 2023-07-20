import { makeObservable, observable, action } from 'mobx';

class AuthStore {
  isLoggedIn = false;
  formFields = {
    username: '',
    password: '',
    role: '', // Add role field to the formFields object
  };
  errors = {
    username: '',
    password: '',
    role: '', // Add role field to the errors object
  };

  constructor() {
    makeObservable(this, {
      formFields:observable,
      isLoggedIn:observable,
      errors: observable,
      login: action,
      logout: action,
      setFormField: action,
      clearFormFields: action,
      setError: action,
    });
  }

  setFormField(field, value) {
    this.formFields[field] = value;
  }

  clearFormFields() {
    this.formFields = {
      username: '',
      password: '',
      role: '', // Clear role field as well
    };
  }

  setError(field, error) {
    this.errors[field] = error;
  }

  login() {
    // Perform login logic here
    this.isLoggedIn = true;
  }

  logout() {
    // Perform logout logic here
    this.isLoggedIn = false;
    this.clearFormFields();
  }
}

export const authStore = new AuthStore();

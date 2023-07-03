import { makeObservable, observable, action } from 'mobx';

class AuthStore {
  isLoggedIn = false;
  formFields = {
    username: '',
    password: '',
    rememberMe:false,
  };
  errors = '';

  constructor() {
    makeObservable(this, {
      isLoggedIn: observable,
      formFields: observable,
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
    };
  }

  setError(errors) {
    this.errors = errors;
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

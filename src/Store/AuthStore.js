import { makeObservable, observable, action } from 'mobx';

class AuthStore {
  isLoggedIn = false;
  username = '';
  password = '';
  errors ="";

  constructor() {
    makeObservable(this, {
      isLoggedIn: observable,
      username: observable,
      password: observable,
      errors: observable,
      login: action,
      logout: action,
      setUsername: action,
      setPassword: action,
    });
  }

  setUsername(username) {
    this.username = username;
  }

  setPassword(password) {
    this.password = password;
  }

  login() {
    // Perform login logic here
    console.log(this.username, this.password);
    console.log('Login successful');
    this.isLoggedIn = true;
  }

  logout() {
    // Perform logout logic here
    this.isLoggedIn = false;
    this.username = '';
    this.password = '';
  }
  
}

export const authStore = new AuthStore();

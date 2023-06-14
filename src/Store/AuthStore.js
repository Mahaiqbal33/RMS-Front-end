import { observable, action } from 'mobx';
export const authStore = observable({
    isLoggedIn: false,
    login: action(function () {
        this.isLoggedIn = true;
    }),
    logout: action(function () {
      this.isLoggedIn = false;
    }),
  });
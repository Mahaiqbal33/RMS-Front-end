import { observable, action } from 'mobx';

// class AuthStore {
//   @observable isLoggedIn = false;

//   @action
//   login() {
//     // Perform login logic here

//     // Assuming login is successful, set the isLoggedIn flag to true
//     this.isLoggedIn = true;
//   }

//   @action
//   logout() {
//     // Perform logout logic here

//     // Set the isLoggedIn flag to false
//     this.isLoggedIn = false;
//   }
// }

// const authStore = new AuthStore();
// export default authStore;
export const authStore = observable({
    isLoggedIn: false,
    login: action(function () {
        this.isLoggedIn = true;
    }),
    logout: action(function () {
      this.isLoggedIn = false;
    }),
  });
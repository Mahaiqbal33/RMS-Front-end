// import { makeObservable, observable, action } from 'mobx';

// class FormStore {
//   formData = {
//     fullName: '',
//     email: '',
//     className: '',
//     gender: '',
//     password: '',
//     subject: '',
//     phoneNumber: '',
//     phoneCountryCode: '+92',
//   };

//   errorMessage = '';

//   constructor() {
//     makeObservable(this, {
//       formData: observable,
//       errorMessage: observable,
//       setFormData: action,
//       resetFormData: action,
//       setErrorMessage: action,
//       clearErrorMessage: action,
//     });
//   }

//   setFormData(data) {
//     this.formData = data;
//   }

//   resetFormData() {
//     this.formData = {
//       fullName: '',
//       email: '',
//       className: '',
//       gender: '',
//       password: '',
//       subject: '',
//       phoneNumber: '',
//     };
//   }

//   setErrorMessage(message) {
//     this.errorMessage = message;
//   }

//   clearErrorMessage() {
//     this.errorMessage = '';
//   }

//   validateForm() {
//     this.clearErrorMessage();

//     if (!this.formData.fullName) {
//       this.setErrorMessage('Full Name is required.');
//       return false;
//     }

//     if (!this.formData.email) {
//       this.setErrorMessage('Email is required.');
//       return false;
//     }

//     if (!this.formData.className) {
//       this.setErrorMessage('Class is required.');
//       return false;
//     }

//     if (!this.formData.gender) {
//       this.setErrorMessage('Gender is required.');
//       return false;
//     }

//     if (!this.formData.password) {
//       this.setErrorMessage('Password is required.');
//       return false;
//     }

//     if (this.formData.password.length < 8) {
//       this.setErrorMessage('Password should be 8 characters and more.');
//       return false;
//     }

//     if (!this.formData.phoneNumber) {
//       this.setErrorMessage('Phone number is required.');
//       return false;
//     }

//     const phoneRegex = /^(\+92)?[0-9]{10}$/;
//     if (!phoneRegex.test(this.formData.phoneNumber)) {
//       this.setErrorMessage('Invalid phone number format. Use Pakistani format (+92xxxxxxxxxx).');
//       return false;
//     }

//     if (!this.formData.subject) {
//       this.setErrorMessage('Subject is required.');
//       return false;
//     }

//     return true;
//   }
// }

// export const formStore = new FormStore();
import { makeObservable, observable, action } from 'mobx';

class FormStore {
  formData = {
    fullName: '',
    email: '',
    className: '',
    gender: '',
    password: '',
    subject: '',
    phoneNumber: '',
    phoneCountryCode: '+92',
  };

  errorMessage = '';

  constructor() {
    makeObservable(this, {
      formData: observable,
      errorMessage: observable,
      setFormData: action,
      resetFormData: action,
      setErrorMessage: action,
      clearErrorMessage: action,
    });
  }

  setFormData(data) {
    this.formData = data;
  }

  resetFormData() {
    this.formData = {
      fullName: '',
      email: '',
      className: '',
      gender: '',
      password: '',
      subject: '',
      phoneNumber: '',
      phoneCountryCode: '+92',
    };
  }

  setErrorMessage(message) {
    this.errorMessage = message;
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  validateForm() {
    this.clearErrorMessage();

    if (!this.formData.fullName) {
      this.setErrorMessage('Full Name is required.');
      return false;
    }

    if (!this.formData.email) {
      this.setErrorMessage('Email is required.');
      return false;
    }

    if (!this.formData.className) {
      this.setErrorMessage('Class is required.');
      return false;
    }

    if (!this.formData.gender) {
      this.setErrorMessage('Gender is required.');
      return false;
    }

    if (!this.formData.password) {
      this.setErrorMessage('Password is required.');
      return false;
    }

    if (this.formData.password.length < 8) {
      this.setErrorMessage('Password should be 8 characters and more.');
      return false;
    }

    if (!this.formData.phoneCountryCode || !this.formData.phoneNumber) {
      this.setErrorMessage('Phone number is required.');
      return false;
    }

    const phoneRegex = /^(\+92)?[0-9]{10}$/;
    const phoneNumber = this.formData.phoneCountryCode + this.formData.phoneNumber;
    if (!phoneRegex.test(phoneNumber)) {
      this.setErrorMessage('Invalid phone number format. Use Pakistani format (+92xxxxxxxxxx).');
      return false;
    }

    if (!this.formData.subject) {
      this.setErrorMessage('Subject is required.');
      return false;
    }

    return true;
  }
}

export const formStore = new FormStore();

// // import { makeObservable, observable, action } from 'mobx';

// // class FormStore {
// //   formData = {
// //     fullName: '',
// //     username: '',
// //     role: 'teacher',
// //     gender: '',
// //     password: '',
// //     subject: '',
// //     phoneNumber: '',
// //   };

// //   errors = {
// //     fullName: '',
// //     username: '',
// //     role: 'teacher',
// //     gender: '',
// //     password: '',
// //     subject: '',
// //     phoneNumber: '',
// //   };
// //  showSuccessMessage= false;
// //  showErrorMessage= false;
// //   constructor() {
// //     makeObservable(this, {
// //       formData: observable,
// //       errors: observable,
// //       showSuccessMessage:observable,
// //       showErrorMessage:observable,
// //       setFormData: action,
// //       resetFormData: action,
// //       setError: action,
// //       clearErrors: action,
// //       setShowSuccessMessage:action,
// //       setShowErrorMessage:action
// //     });
// //   }

// //   setFormData(data) {
// //     this.formData = data;
// //   }

// //   resetFormData() {
// //     this.formData = {
// //       fullName: '',
// //       username: '',
// //       gender: '',
// //       password: '',
// //       subject: '',
// //       phoneNumber: '',
// //     };
// //   }
// //   setError(fieldName, errorMessage) {
// //     this.errors[fieldName] = errorMessage;
// //   }

// //   clearErrors() {
// //     this.errors = {
// //       fullName: '',
// //       username: '',
// //       role: '',
// //       gender: '',
// //       password: '',
// //       subject: '',
// //       phoneNumber: '',
// //     };
// //   }

// //   setShowSuccessMessage(value){
// //     this.showSuccessMessage= value;
// //   }
// //   setShowErrorMessage(value){
// //     this.showErrorMessage= value;
// //   }

 
// // }

// // export const formStore = new FormStore();
// import { makeObservable, observable, action } from 'mobx';

// class FormStore {
//   formData = {
//     fullName: '',
//     username: '',
//     role: 'teacher',
//     gender: '',
//     password: '',
//     subject: '',
//     phoneNumber: '',
//   };

//   errors = {
//     fullName: '',
//     username: '',
//     role: 'teacher',
//     gender: '',
//     password: '',
//     subject: '',
//     phoneNumber: '',
//   };

//   showSuccessMessage = false;
//   showErrorMessage = false;
//   csvFile = null;

//   constructor() {
//     makeObservable(this, {
//       formData: observable,
//       errors: observable,
//       showSuccessMessage: observable,
//       showErrorMessage: observable,
//       csvFile: observable,
//       setFormData: action,
//       resetFormData: action,
//       setError: action,
//       clearErrors: action,
//       setShowSuccessMessage: action,
//       setShowErrorMessage: action,
//       setCSVFile: action,
//       resetCSVFile: action,
//     });
//   }

//   setFormData(data) {
//     this.formData = data;
//   }

//   resetFormData() {
//     this.formData = {
//       fullName: '',
//       username: '',
//       gender: '',
//       password: '',
//       subject: '',
//       phoneNumber: '',
//     };
//   }

//   setError(fieldName, errorMessage) {
//     this.errors[fieldName] = errorMessage;
//   }

//   clearErrors() {
//     this.errors = {
//       fullName: '',
//       username: '',
//       role: '',
//       gender: '',
//       password: '',
//       subject: '',
//       phoneNumber: '',
//     };
//   }

//   setShowSuccessMessage(value) {
//     this.showSuccessMessage = value;
//   }

//   setShowErrorMessage(value) {
//     this.showErrorMessage = value;
//   }

//   setCSVFile(file) {
//     this.csvFile = file;
//   }

//   resetCSVFile() {
//     this.csvFile = null;
//   }
// }

// export const formStore = new FormStore();

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
    file:'',
  };
  showManuallyForm= true;
  csvFile = null;
  showCSVForm = false;

  constructor() {
    makeObservable(this, {
      formData: observable,
      errors: observable,
      csvFile: observable,
      showCSVForm: observable,
      setFormData: action,
      resetFormData: action,
      setError: action,
      clearErrors: action,
      showManuallyForm:observable,
      setShowManuallyForm:action,
      setCSVFile: action,
      resetCSVFile: action,
      setShowCSVForm: action,
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
      file:''
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

  
  setCSVFile(file) {
    this.csvFile = file;
  
  }

  resetCSVFile() {
    this.csvFile = null;
    console.log(this.csvFile)
  }

  setShowCSVForm(value) {
    this.showCSVForm = value;
  }

  setShowManuallyForm(value){
    this.showManuallyForm= value;
  }
}

export const formStore = new FormStore();

import { makeObservable, observable, action } from 'mobx';

class formStore {
  formData = {
    fullName: '',
    username: '',
    role: 'student',
    gender: '',
    password: '',
    phoneNumber: '',
    Class:'',
    batch:''
  };

  errors = {
    fullName: '',
    username: '',
    role: 'student',
    gender: '',
    password: '',
    phoneNumber: '',
    file:'',
    Class:'',
    batch:''
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
      phoneNumber: '',
      file:'',
      Class:'',
      batch:''
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
      phoneNumber: '',
      Class:'',
      batch:''
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

export const FormStore = new formStore();
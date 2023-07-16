import { makeObservable, observable, action } from 'mobx';

class formStore {
  formData = {
    name: '',
    username: '',
    role: 'student',
    gender: '',
    password: '',
    phone_number: '',
    class_name:'',
    batch:''
  };

  errors = {
    name: '',
    username: '',
    role: 'student',
    gender: '',
    password: '',
    phone_number: '',
    file:'',
    class_name:'',
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
      name: '',
      username: '',
      role:'student',
      gender: '',
      password: '',
      phone_number: '',
      file:'',
      class_name:'',
      batch:''
    };
  }

  setError(fieldName, errorMessage) {
    this.errors[fieldName] = errorMessage;
  }

  clearErrors() {
    this.errors = {
      name: '',
      username: '',
      role: 'student',
      gender: '',
      password: '',
      phone_number: '',
      class_name:'',
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

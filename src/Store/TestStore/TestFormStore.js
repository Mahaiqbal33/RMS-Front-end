import { makeObservable, observable, action } from 'mobx';

class FormStore {
  formData = {
    subjectName: '',
    testDate: '',
    totalMarks: '',
    courseCode: '',
    className: '',
  };

  errors = {
    subjectName: '',
    testDate: '',
    totalMarks: '',
    courseCode: '',
    className: '',
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
      subjectName: '',
      testDate: '',
      totalMarks: '',
      courseCode: '',
      className: '',
    };
  }

  setError(fieldName, errorMessage) {
    this.errors[fieldName] = errorMessage;
  }

  clearErrors() {
    this.errors = {
      subjectName: '',
      testDate: '',
      totalMarks: '',
      courseCode: '',
      className: '',
    };
  }
}

export const formStore = new FormStore();

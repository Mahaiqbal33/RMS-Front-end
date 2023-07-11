import { makeObservable, observable, action, toJS } from 'mobx';
import axios from 'axios';
class SubjectCombinationStore {
  formData = {
    name: '',
    course_code :''
  };

  errors = {
   name: '',
     course_code :""
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
     name: '',
       course_code :""
    };
  }

  setError(fieldName, errorMessage) {
    this.errors[fieldName] = errorMessage;
  }

  clearErrors() {
    this.errors = {
     name: '',
       course_code :""
    };
  }
}

export const subjectCombinationStore = new SubjectCombinationStore();

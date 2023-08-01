import { makeObservable, observable, action } from 'mobx';
import { toJS } from 'mobx';
import { subjectformStore } from '../SubjectsStore/SubjectsFormStore';
class FormStore {
  formData = {
    subject_id: '',
    subject:"",
    name: '',
    totalMarks: '',
    className: '',
  };
  subjectList=subjectformStore.subjectList;
  errors = {
    subject: '',
    name: '',
    totalMarks: '',
    className: '',
  };

  constructor() {
    makeObservable(this, {
      subjectList:observable,
      formData: observable,
      errors: observable,
      setFormData: action,
      resetFormData: action,
      setError: action,
      clearErrors: action,
      filtersubject_id:action,
    });
  }

  setFormData(data) {
    this.formData = data;
  }

  resetFormData() {
    this.formData = {
      subject_id: '',
      name: '',
      totalMarks: '',
      className: '',
    };
  }

  setError(fieldName, errorMessage) {
    this.errors[fieldName] = errorMessage;
  }

  clearErrors() {
    this.errors = {
      subject: '',
      name: '',
      totalMarks: '',
      className: '',
    };
  }

  async filtersubject_id() {
    try {
      // Make sure subjectList is fetched before proceeding
      await subjectformStore.fetchSubjectList();
  
      const subjectListArray = Array.from(subjectformStore.subjectList);
      const filteredSubject = subjectListArray.find((subject) => subject.name === this.formData.subject);
      if (filteredSubject) {
        const subjectData = toJS(filteredSubject);
        if (subjectData.id) {
          this.formData.subject_id = subjectData.id;
        }
      } else {
        // If subject not found, reset subject_id
        this.formData.subject_id = "";
      }
    } catch (error) {
      // Handle any errors that may occur during the fetchSubjectList() operation
      console.error("Error fetching subject list:", error);
    }
  }
  
}

export const formStore = new FormStore();

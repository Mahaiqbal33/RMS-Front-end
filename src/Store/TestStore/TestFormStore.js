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
    subject_id: '',
    subject:"",
    name: '',
    totalMarks: '',
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
      subject_id: '',
      name: '',
      totalMarks: '',
      className: '',
    };
  }

  async filtersubject_id() {
    await subjectformStore.fetchSubjectList(); // Wait for subjectList to be populated
     
    const subjectListArray = Array.from(this.subjectList);
    console.log("Subject List Array:", subjectListArray);
    console.log("Search for Subject:", this.formData.subject);

    const filteredSubject = subjectListArray.find((subject) => subject.name === this.formData.subject);
    console.log("Filtered Subject:", filteredSubject);

    if (filteredSubject) {
      const subjectData = toJS(filteredSubject);
      if (subjectData.id) {
        console.log(subjectData);
        this.formData.subject_id = subjectData.id;
      } else {
        this.formData.subject_id = '';
      }
    } else {
      this.formData.subject_id = '';
    }
  }

}

export const formStore = new FormStore();

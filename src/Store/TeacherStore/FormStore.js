import { makeObservable, observable, action } from 'mobx';
import { subjectformStore } from '../SubjectsStore/SubjectsFormStore';
import { toJS } from 'mobx';
class FormStore {
  formData = {
    fullName: '',
    username: '',
    role: 'teacher',
    gender: '',
    password: '',
    subject: '',
    phoneNumber: '',
    subject_id:"",
  };
  subjectList=subjectformStore.subjectList;
  errors = {
    fullName: '',
    username: '',
    role: 'teacher',
    gender: '',
    password: '',
    subject: '',
    phoneNumber: '',
    file:'',
    subject_id:"",
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
      subjectList:observable,
      setFormData: action,
      resetFormData: action,
      setError: action,
      clearErrors: action,
      showManuallyForm:observable,
      setShowManuallyForm:action,
      setCSVFile: action,
      resetCSVFile: action,
      setShowCSVForm: action,
      filtersubject_id:action,
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
      file:'',
      subject_id:""
    };
  }

  setError(fieldName, errorMessage) {
    this.errors[fieldName] = errorMessage;
  }


  async filtersubject_id() {
    try {
      // Make sure subjectList is fetched before proceeding
      await subjectformStore.fetchSubjectList();
  
      const subjectListArray = Array.from(subjectformStore.subjectList);
      console.log("Subject List Array:", subjectListArray);
      console.log("Search for Subject:", this.formData.subject);
  
      const filteredSubject = subjectListArray.find((subject) => subject.name === this.formData.subject);
      console.log("Filtered Subject:", filteredSubject);
  
      if (filteredSubject) {
        const subjectData = toJS(filteredSubject);
        if (subjectData.id) {
          console.log("hello id", subjectData.id);
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


  clearErrors() {
    this.errors = {
      fullName: '',
      username: '',
      role: '',
      gender: '',
      password: '',
      subject: '',
      phoneNumber: '',
      subject_id:"",
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

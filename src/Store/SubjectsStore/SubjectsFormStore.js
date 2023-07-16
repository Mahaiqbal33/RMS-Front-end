import { makeObservable, observable, action, toJS } from 'mobx';
import { SC } from '../../Services/serverCall';
import { StudentStore } from '../studentStore/studentStore';

class SubjectFormStore {
  formData = {
    username: '',
    subject: '',
    student_id: '',
    subject_id: '',
  };
  subjectList = [];
  studentList = StudentStore.getStudent;
  errors = {
    username: '',
    subject: '',
    student_id: '',
    subject_id: '',
  };
  showSubjectsCombinationForm = true;

  constructor() {
    makeObservable(this, {
      formData: observable,
      errors: observable,
      subjectList: observable,
      studentList: observable,
      showSubjectsCombinationForm: observable,
      setShowSubjectsCombinationForm: action,
      setFormData: action,
      resetFormData: action,
      setError: action,
      clearErrors: action,
      fetchSubjectList: action,
      filterstudent_id: action,
      filtersubject_id: action,
    });
  }

  async fetchSubjectList() {
    try {
      const response = await SC.getCall('/subject');
      console.log('API Response:', response.data); // Log the entire response to check its format
      this.subjectList = response.data;
    } catch (error) {
      console.error('Failed to fetch subject list:', error);
    }
  }
  
  

  filterstudent_id() {
    const studentListArray = this.studentList.slice();
    console.log("Student List Array:", studentListArray);
    console.log("Search for Username:", this.formData.username);
  
    const filteredStudent = studentListArray.find((user) => user.username === this.formData.username);
    console.log("Filtered Student:", filteredStudent);
  
    if (filteredStudent) {
      const studentData = toJS(filteredStudent);
      if (studentData.id) {
        this.formData.student_id = studentData.id;
      } else {
        this.formData.student_id = '';
      }
    } else {
      this.formData.student_id = '';
    }
  }

  
  filtersubject_id() {
    const subjectListArray = Array.from(this.subjectList);
    console.log("Subject List Array:", subjectListArray);
    console.log("Search for Subject:", this.formData.subject);
  
    const filteredSubject = subjectListArray.find((subject) => subject.name === this.formData.subject);
    console.log("Filtered Subject:", filteredSubject);
  
    if (filteredSubject) {
      const subjectData = toJS(filteredSubject);
      if (subjectData.id) {
        this.formData.student_id = subjectData.id;
      } else {
        this.formData.subject_id = '';
      }
    } else {
      this.formData.subject_id = '';
    }
  }
  
  
  
  
  setFormData(data) {
    this.formData = data;
  }

  resetFormData() {
    this.formData = {
      username: '',
      subject: '',
      student_id: '',
      subject_id: '',
    };
  }

  setError(fieldName, errorMessage) {
    this.errors[fieldName] = errorMessage;
  }

  clearErrors() {
    this.errors = {
      username: '',
      subject: '',
      student_id: '',
      subject_id: '',
    };
  }

  setShowSubjectsCombinationForm(value) {
    this.showSubjectsCombinationForm = value;
  }
}

export const subjectformStore = new SubjectFormStore();

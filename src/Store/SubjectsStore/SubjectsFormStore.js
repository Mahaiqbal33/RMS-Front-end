import { makeObservable, observable, action, toJS } from 'mobx';
import { SC } from '../../Services/serverCall';

class SubjectFormStore {
  formData = {
    username: '',
    subject: '',
    student_id: '',
    subject_id: '',
  };

  subjectList = [];
  studentList = [];
  errors = {
    username: '',
    subject: '',
  };
  showSubjectsCombinationForm = true;

  constructor() {
    makeObservable(this, {
      formData: observable,
      errors: observable,
      subjectList: observable,
      studentList: observable,
      fetchStudents:action,
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
      const response = await SC.getCall('/subjects');
      this.subjectList = response.data;
    } catch (error) {
      console.error('Failed to fetch subject list:', error);
    }
  }
  
  
  async fetchStudents() {
    try {
      const response = await SC.getCall('/students');
      this.studentList = response.data;
    } catch (error) {
      console.error('Failed to fetch student list:', error);
    }
  }

  async filterstudent_id() {
    await this.fetchStudents();

    const filteredStudent = this.studentList?.find((student) => student.username === this.formData.username);

    if (filteredStudent && filteredStudent.id) {
      this.formData.student_id = filteredStudent.id;
    } else {
      this.formData.student_id = "";
    }
  }
  
async  filtersubject_id() {
    const subjectListArray = await Array.from(this.subjectList);
  
    const filteredSubject = subjectListArray?.find((subject) => subject.name === this.formData.subject);
    if (filteredSubject) {
      const subjectData = toJS(filteredSubject);
      if (subjectData.id) {
        this.formData.subject_id = subjectData.id;
      }
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
    };
  }

  setShowSubjectsCombinationForm(value) {
    this.showSubjectsCombinationForm = value;
  }
}

export const subjectformStore = new SubjectFormStore();

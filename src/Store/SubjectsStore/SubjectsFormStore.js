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
      const response = await SC.getCall('/subject');
      console.log('API Response:', response.data); // Log the entire response to check its format
      this.subjectList = response.data;
    } catch (error) {
      console.error('Failed to fetch subject list:', error);
    }
  }
  
  
  async fetchStudents() {
    try {
      const response = await SC.getCall('/student');
      console.log('API Response:', response.data.data); // Log the entire response to check its format
      this.studentList = response.data.data;
    } catch (error) {
      console.error('Failed to fetch student list:', error);
    }
  }

  async filterstudent_id() {
    await this.fetchStudents();
    console.log("Student List Array:", toJS(this.studentList));
    console.log("Search for Username:", this.formData.username);

    const filteredStudent = this.studentList.find((student) => student.username === this.formData.username);
    console.log("Filtered Student:", toJS(filteredStudent));

    if (filteredStudent && filteredStudent.id) {
      console.log("Filtered Student ID:", filteredStudent.id);
      this.formData.student_id = filteredStudent.id;
    } else {
      console.log("Student not found with the provided username.");
      this.formData.student_id = "";
    }
  }
  
 
  

  
async  filtersubject_id() {
    const subjectListArray = await Array.from(this.subjectList);
    console.log("Subject List Array:", subjectListArray);
    console.log("Search for Subject:", this.formData.subject);
  
    const filteredSubject = subjectListArray.find((subject) => subject.name === this.formData.subject);
    console.log("Filtered Subject:", filteredSubject); 
    if (filteredSubject) {
      const subjectData = toJS(filteredSubject);
      if (subjectData.id) {
        console.log("hello id",subjectData.id)
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

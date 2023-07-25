import { makeObservable, observable, action, toJS } from 'mobx';
import { subjectformStore } from '../../Store/SubjectsStore/SubjectsFormStore';
import { SC } from '../../Services/serverCall';

class ResultFormStore {
  formData = {
    username: '',
    testname: '',
    obtainMarks: '',
    student_id: '',
    attempt_id: '',
  };
  getTest=[]
  studentList = subjectformStore.studentList;
  errors = {
    username: '',
    testname: '',
    obtainMarks: '',
  };
  showresultsCombinationForm = true;

  constructor() {
    makeObservable(this, {
      formData: observable,
      errors: observable,
      studentList: observable,
      fetchtests:action,
      setFormData: action,
      resetFormData: action,
      setError: action,
      clearErrors: action,
      filterstudent_id: action,
      filtertest_id: action,
    });
  }

  
  async fetchtests() {
    try {
      const response = await SC.getCall(`/attempts`);
      this.getTest = response.data.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

async  filtertest_id() {
    await this.fetchtests();
    console.log("Search for Testname:", this.formData.testname);

    const filteredTest = await this.getTest.find((test) => test.name === this.formData.testname);
    console.log("Filtered Test:", toJS(filteredTest));

    if (filteredTest && filteredTest.id) {
      console.log("Filtered Test ID:", filteredTest.id);
      this.formData.attempt_id = filteredTest.id;
    } else {
      console.log("Test not found with the provided testname.");
      this.formData.attempt_id = "";
    }
  }


  async filterstudent_id() {
    await subjectformStore.fetchStudents();
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
  
 
  setFormData(data) {
    this.formData = data;
  }

  resetFormData() {
    this.formData = {
      username: '',
      testname: '',
      obtainMarks: '',
    };
  }

  setError(fieldName, errorMessage) {
    this.errors[fieldName] = errorMessage;
  }

  clearErrors() {
    this.errors = {
      username: '',
      testname: '',
      obtainMarks: '',
    };
  }

  
}

export const resultformStore = new ResultFormStore();

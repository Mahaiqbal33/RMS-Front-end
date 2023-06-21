import { makeObservable, observable, action } from 'mobx';

class TeacherStore {
  data = {
    name: '',
    email: '',
    className: '',
    gender: '',
    password: '',
    phoneNumber: '',
    subject: '',
    designation: '',
  };

  teacherData = [];

  constructor() {
    makeObservable(this, {
      data: observable,
      teacherData: observable,
      resetForm: action,
      setData: action,
      addTeacher: action,
    });
  }

  resetForm() {
    this.data = {
      name: '',
      email: '',
      className: '',
      gender: '',
      password: '',
      phoneNumber: '',
      subject: '',
      designation: '',
    };
  }

  setData(name, value) {
    this.data[name] = value;
  }

  addTeacher() {
    const newTeacher = { ...this.data }; // Create a new object with current data values
    this.teacherData.push(newTeacher);
  }
}


export const teacherStore = new TeacherStore();
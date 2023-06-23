import { makeObservable, observable, action, computed } from 'mobx';
import axios from 'axios';

class TeacherStore {
  data = {
    name: '',
    email: '',
    className: '',
    gender: '',
    password: '',
    phoneNumber: '',
    subject: '',
  };

  teachers = [];
  getTeacher = [];

  searchTerm = '';
  filterType = '';

  constructor() {
    makeObservable(this, {
      data: observable,
      teachers: observable,
      getTeacher: observable,
      searchTerm: observable,
      filterType: observable,
      filteredTeachers: computed,
      resetForm: action,
      setData: action,
      addTeacher: action,
      fetchTeachers: action,
      deleteTeacher: action,
      setFilter: action,
      setSearchTerm: action,
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
    };
  }

  setData(name, value) {
    this.data[name] = value;
  }

  addTeacher() {
    const newTeacher = { ...this.data }; // Create a new object with current data values
    this.teachers.push(newTeacher);
  }

  async fetchTeachers() {
    await axios
      .get('https://dummyjson.com/users') // Replace with your actual API endpoint
      .then((response) => {
        this.getTeacher = response.data.users;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  deleteTeacher(teacherId) {
    axios
      .delete(`https://dummyjson.com/users/${teacherId}`) // Replace with your actual API endpoint
      .then(() => {
        console.log(teacherId)
        // Remove the deleted teacher from the local array
        this.getTeacher = this.getTeacher.filter((teacher) => teacher.id !== teacherId);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  

  setFilter(filter) {
    this.filterType = filter;
  }

  setSearchTerm(term) {
    this.searchTerm = term;
  }

  get filteredTeachers() {
    const { filterType, searchTerm, getTeacher } = this;
  
    return getTeacher.filter((teacher) => {
      if (!filterType || filterType === 'All') {
        return (
          teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (teacher.class && teacher.class.toLowerCase().includes(searchTerm.toLowerCase())) ||
          teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.gender.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      return (teacher[filterType] && teacher[filterType].toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }
  
}

export const teacherStore = new TeacherStore();

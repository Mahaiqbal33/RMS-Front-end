import { makeObservable, observable, action, computed } from 'mobx';
import axios from 'axios';

class TeacherStore {
  isPopupOpen = false;
  teachers = [];
  getTeacher = [];
  searchTerm = '';
  filterType = '';
  currentTeacherId = null;
  currentTeacherData = {};

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      teachers: observable,
      getTeacher: observable,
      searchTerm: observable,
      filterType: observable,
      currentTeacherId: observable,
      currentTeacherData: observable,
      setPopupOpen: action.bound,
      filteredTeachers: computed,
      addTeacher: action,
      fetchTeachers: action,
      deleteTeacher: action,
      setFilter: action,
      setSearchTerm: action,
      setCurrentTeacherId: action,
      setCurrentTeacherData: action, // New action to set current teacher data
      getTeacherById: computed,
    });
  }
  addTeacher(teacherData) {
    // Add the teacher to the teachers array
    this.teachers.push(teacherData);
  }
  setPopupOpen = (value) => {
    this.isPopupOpen = value;
  };
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
      if (!teacher) {
        return false; // Skip null/undefined teacher objects
      }
  
      if (!filterType || filterType === 'All') {
        return (
          (teacher.firstName && teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (teacher.subject && teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (teacher.class && teacher.class.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (teacher.email && teacher.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (teacher.gender && teacher.gender.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
  
      return (teacher[filterType] && teacher[filterType].toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }
  

  setCurrentTeacherId(teacherId) {
    this.currentTeacherId = teacherId;
    this.setCurrentTeacherData(teacherId); // Update current teacher data
  }

  get getTeacherById() {
    return (id) => this.getTeacher.find((teacher) => teacher.id === id);
  }
  setCurrentTeacherData(teacherId) {
    this.currentTeacherData = this.getTeacher.find((teacher) => teacher.id === teacherId) || {};
  }
  
}

export const teacherStore = new TeacherStore();

import { makeObservable, observable, action, computed } from 'mobx';
import sweetAlertConfig from '../../Component/Alerts/alertConfig';
import Swal from 'sweetalert2';
import axios from 'axios';
class TeacherStore {
  isPopupOpen = false;
  getTeacher = [];
  searchTerm = '';
  filterType = '';
  currentTeacherId = null;
  currentTeacherData = {};
  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      getTeacher: observable,
      searchTerm: observable,
      filterType: observable,
      currentTeacherId: observable,
      currentTeacherData: observable,
      setPopupOpen: action.bound,
      filteredTeachers: computed,
      fetchTeachers: action,
      deleteTeacher: action,
      setFilter: action,
      setSearchTerm: action,
      setCurrentTeacherId: action,
      setCurrentTeacherData: action, // New action to set current teacher data
      getTeacherById: computed,
    });
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
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
    axios
      .delete(`https://dummyjson.com/users/${teacherId}`) // Replace with your actual API endpoint
      .then(() => {
        console.log(teacherId)
        // Remove the deleted teacher from the local array
        this.getTeacher = this.getTeacher.filter((teacher) => teacher.id !== teacherId);
        sweetAlertConfig.successAlert("Teacher is deleted successfully!")
      })
      .catch((error) => {
        console.error('Error:', error);
        sweetAlertConfig.errorAlert("An error occurred while deleting the teacher.")
      });
    }
  })
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

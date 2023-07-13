import { makeObservable, observable, action, computed } from 'mobx';
import sweetAlertConfig from '../../Component/Alerts/alertConfig';
import Swal from 'sweetalert2';
import axios from 'axios';

class studentStore {
  isPopupOpen = false;
  getStudent = [];
  searchTerm = '';
  filterType = '';
  currentStudentId = null;
  currentStudentData = {};

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      getStudent: observable,
      searchTerm: observable,
      filterType: observable,
      currentStudentId: observable,
      currentStudentData: observable,
      setPopupOpen: action.bound,
      filteredStudents: computed,
      fetchStudents: action,
      deleteStudent: action,
      setFilter: action,
      setSearchTerm: action,
      setCurrentStudentId: action,
      setCurrentStudentData: action, // New action to set current teacher data
      getStudentById: computed,
    });
  }
  setPopupOpen = (value) => {
    this.isPopupOpen = value;
  };
  async fetchStudents() {
    await axios
      .get('https://dummyjson.com/users') // Replace with your actual API endpoint
      .then((response) => {
        this.getStudent = response.data.users;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //pagination functionality
  // async fetchTeachers(page, pageSize) {
  //   const url = `https://dummyjson.com/users?page=${page}&limit=${pageSize}`;
  
  //   try {
  //     const response = await axios.get(url);
  //     this.getTeacher = response.data.users;
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }


  deleteStudent(studentId) {
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
      .delete(`https://dummyjson.com/users/${studentId}`) // Replace with your actual API endpoint
      .then(() => {
        console.log(studentId)
        // Remove the deleted teacher from the local array
        this.getStudent = this.getStudent.filter((student) => student.id !== studentId);
        sweetAlertConfig.successAlert("Student is deleted successfully!")
      })
      .catch((error) => {
        console.error('Error:', error);
        sweetAlertConfig.errorAlert("An error occurred while deleting the student.")
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

  
  get filteredStudents() {
    const { filterType, searchTerm, getStudent } = this;
  
    return getStudent.filter((student) => {
      if (!student) {
        return false; // Skip null/undefined teacher objects
      }
  
      if (!filterType || filterType === 'All') {
        return (
          (student.firstName && student.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.subject && student.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.class && student.class.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.gender && student.gender.toLowerCase().includes(searchTerm.toLowerCase()))||
          (student.class && student.class.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
  
      return (student[filterType] && student[filterType].toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }
  

  setCurrentStudentId(StudentId) {
    this.currentStudentId = StudentId;
    this.setCurrentStudentData(StudentId); // Update current Student data
  }

  get getStudentById() {
    return (id) => this.getStudent.find((Student) => Student.id === id);
  }
  setCurrentStudentData(StudentId) {
    this.currentStudentData = this.getStudent.find((Student) => Student.id === StudentId) || {};
  }
  
}

export const StudentStore = new studentStore();
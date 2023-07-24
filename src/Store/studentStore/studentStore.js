import { makeObservable, observable, action, computed } from 'mobx';
import sweetAlertConfig from '../../Component/Alerts/alertConfig';
import Swal from 'sweetalert2';
import { SC } from '../../Services/serverCall';
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
  
  async fetchStudents(page, pageSize) {
    try {
      const response = await SC.getCall(`/students?page=${page}&limit=${pageSize}`);
      this.getStudent = response.data.data;
      console.log('API Response:', response.data.data); // Log the entire response to check its format
      this.pageCount = Math.ceil(response.data.meta.total / pageSize);
      this.currentPage = page;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
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
      SC.deleteCall(`/students/${studentId}`) // Replace with your actual API endpoint
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
  
    if (!getStudent) {
      return []; // Return an empty array if getStudent is undefined or null
    }
  
    return getStudent.filter((student) => {
      if (!student) {
        return false; // Skip null/undefined student objects
      }
  
      if (!filterType || filterType === 'All') {
        return (
          (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.batch && student.batch.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.class_name && student.class_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.user_name && student.user_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.gender && student.gender.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
  
      return student[filterType] && student[filterType].toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
  

  setCurrentStudentId(StudentId) {
    this.currentStudentId = StudentId;
    this.setCurrentStudentData(StudentId); // Update current Student data
    // console.log(StudentId)
  }

  get getStudentById() {
    return (id) => this.getStudent.find((Student) => Student.id === id);
  }
  setCurrentStudentData(StudentId) {
    this.currentStudentData = this.getStudent.find((Student) => Student.id === StudentId) || {};
  }
  
}

export const StudentStore = new studentStore();

import { makeObservable, observable, action, computed } from 'mobx';
import Swal from 'sweetalert2';
import { SC } from '../../Services/serverCall';
import sweetAlertConfig from '../../Component/Alerts/alertConfig';

class studentStore {
  isPopupOpen = false;
  getStudent = [];
  filterType = "";
  searchTerm = '';
  currentStudentId = null;
  currentStudentData = {};
  currentPage = 0;
  entriesPerPage = 4;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      getStudent: observable,
      filterType: observable,
      searchTerm: observable,
      currentStudentId: observable,
      currentStudentData: observable,
      currentPage: observable,
      entriesPerPage: observable,
      totalPages: observable,
      setPopupOpen: action,
      setFilter: action,
      fetchStudents: action,
      deleteStudent: action,
      setCurrentPage: action,
      setSearchTerm: action,
      setCurrentStudentId: action,
      setCurrentStudentData: action,
      getStudentById: computed,
    });
  }

  setPopupOpen = (value) => {
    this.isPopupOpen = value;
  };

  async fetchStudents() {
    try {
      const response = await SC.postCall('/students/pagination', {
        page: this.currentPage + 1,
        page_size: this.entriesPerPage,
        sort: {
          column: 'created_at',
          order: 'desc',
        },
        filter: [
          {
            columns: [this.filterType],
            operation: 'like',
            value: this.searchTerm,
          },
        ],
      });
      this.filterType='';
      this.searchTerm="";
      this.getStudent = response.data.paginatedData.data || [];
      this.totalPages = response.data.paginatedData.meta.total;
      this.currentPage = response.data.paginatedData.meta.current_page - 1;
    } catch (error) {
      console.error('Error:', error.messages);
    }
  }

  setFilter(filter) {
    this.filterType = filter;
  }

  deleteStudent(StudentId) {
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
        SC.deleteCall(`/Students/${StudentId}`) // Replace with your actual API endpoint
          .then(() => {
            this.getStudent = this.getStudent.filter((Student) => Student.id !== StudentId);
            sweetAlertConfig.successAlert("test is deleted successfully!")
          })
          .catch((error) => {
            console.error('Error:', error);
            sweetAlertConfig.errorAlert("An error occurred while deleting the test.")
          });
      }
    });
  }
  
  setCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
  }

  setSearchTerm(term) {
    this.searchTerm = term;
  }

  setCurrentStudentId(StudentId) {
    this.currentStudentId = StudentId;
    this.setCurrentStudentData(StudentId);
  }

  setCurrentStudentData(StudentId) {
    this.currentStudentData = this.getStudent.find((Student) => Student.id === StudentId) || {};
  }

  get getStudentById() {
    return (id) => this.getStudent.find((Student) => Student.id === id);
  }
}

export const StudentStore = new studentStore();

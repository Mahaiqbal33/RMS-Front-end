import { makeObservable, observable, action, computed } from 'mobx';
import Swal from 'sweetalert2';
import { SC } from '../../Services/serverCall';
import sweetAlertConfig from '../../Component/Alerts/alertConfig';

class SubjectStore {
  isPopupOpen = false;
  getSubject = [];
  filterType = "";
  searchTerm = '';
  currentSubjectId = null;
  currentSubjectData = {};
  currentPage = 0;
  entriesPerPage = 4;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      getSubject: observable,
      filterType: observable,
      searchTerm: observable,
      currentSubjectId: observable,
      currentSubjectData: observable,
      currentPage: observable,
      entriesPerPage: observable,
      totalPages: observable,
      setPopupOpen: action,
      setFilter: action,
      fetchSubjects: action,
      deleteSubject: action,
      setCurrentPage: action,
      setSearchTerm: action,
      setCurrentSubjectId: action,
      setCurrentSubjectData: action,
      getSubjectById: computed,
    });
  }

  setPopupOpen = (value) => {
    this.isPopupOpen = value;
  };

  async fetchSubjects() {
    try {
      const response = await SC.postCall('/student-subjects/pagination', {
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
      this.getSubject = response.data.paginatedData.data || [];
      this.totalPages = response.data.paginatedData.meta.total;
      this.currentPage = response.data.paginatedData.meta.current_page - 1;
    } catch (error) {
      console.error('Error:', error.messages);
    }
  }

  setFilter(filter) {
    this.filterType = filter;
  }

  deleteSubject(subjectId) {
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
        SC.deleteCall(`/student-subjects/${subjectId}`) // Replace with your actual API endpoint
          .then(() => {
            this.getSubject = this.getsubject.filter((subject) => subject.id !== subjectId);
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

  setCurrentSubjectId(SubjectId) {
    this.currentSubjectId = SubjectId;
    this.setCurrentSubjectData(SubjectId);
  }

  setCurrentSubjectData(SubjectId) {
    this.currentSubjectData = this.getSubject.find((Subject) => Subject.id === SubjectId) || {};
  }

  get getSubjectById() {
    return (id) => this.getSubject.find((Subject) => Subject.id === id);
  }
}

export const subjectsStore = new SubjectStore();

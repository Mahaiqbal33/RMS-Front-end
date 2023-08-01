import { makeObservable, observable, action, computed } from 'mobx';
import Swal from 'sweetalert2';
import { SC } from '../../Services/serverCall';
import sweetAlertConfig from '../../Component/Alerts/alertConfig';

class TestStore {
  isPopupOpen = false;
  getTest = [];
  filterType = "";
  searchTerm = '';
  currentTestId = null;
  currentTestData = {};
  currentPage = 0;
  entriesPerPage = 4;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      getTest: observable,
      filterType: observable,
      searchTerm: observable,
      currentTestId: observable,
      currentTestData: observable,
      currentPage: observable,
      entriesPerPage: observable,
      totalPages: observable,
      setPopupOpen: action,
      setFilter: action,
      fetchTests: action,
      deleteTest: action,
      setCurrentPage: action,
      setSearchTerm: action,
      setCurrentTestId: action,
      setCurrentTestData: action,
      getTestById: computed,
    });
  }

  setPopupOpen = (value) => {
    this.isPopupOpen = value;
  };

  async fetchTests() {
    try {
      const response = await SC.postCall('/attempts/pagination', {
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
      this.getTest = response.data.paginatedData.data || [];
      this.totalPages = response.data.paginatedData.meta.total;
      this.currentPage = response.data.paginatedData.meta.current_page - 1;
    } catch (error) {
      console.error('Error:', error.messages);
    }
  }

  setFilter(filter) {
    this.filterType = filter;
  }

  deleteTest(testId) {
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
        SC.deleteCall(`/tests/${testId}`) // Replace with your actual API endpoint
          .then(() => {
            this.getTest = this.getTest.filter((Test) => Test.id !== testId);
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

  setCurrentTestId(TestId) {
    this.currentTestId = TestId;
    this.setCurrentTestData(TestId);
  }

  setCurrentTestData(TestId) {
    this.currentTestData = this.getTest.find((Test) => Test.id === TestId) || {};
  }

  get getTestById() {
    return (id) => this.getTest.find((Test) => Test.id === id);
  }
}

export const testStore = new TestStore();

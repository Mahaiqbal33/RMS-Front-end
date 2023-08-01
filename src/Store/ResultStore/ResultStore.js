import { makeObservable, observable, action, computed } from 'mobx';
import Swal from 'sweetalert2';
import { SC } from '../../Services/serverCall';
import { toJS } from 'mobx';
import sweetAlertConfig from '../../Component/Alerts/alertConfig';

class ResultStore {
  isPopupOpen = false;
  getResult = [];
  filterType = "";
  searchTerm = '';
  currentResultId = null;
  currentResultData = {};
  currentPage = 0;
  entriesPerPage = 4;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      getResult: observable,
      filterType: observable,
      searchTerm: observable,
      currentResultId: observable,
      currentResultData: observable,
      currentPage: observable,
      entriesPerPage: observable,
      totalPages: observable,
      setPopupOpen: action,
      setFilter: action,
      fetchResults: action,
      deleteResult: action,
      setCurrentPage: action,
      setSearchTerm: action,
      setCurrentResultId: action,
      setCurrentResultData: action,
      getResultById: computed,
    });
  }

  setPopupOpen = (value) => {
    this.isPopupOpen = value;
  };

  async fetchResults() {
    try {
      const response = await SC.postCall('/assessments/pagination', {
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
      this.getResult = response.data.paginatedData.data || [];
      console.log("this.getResult", toJS(this.getResult))
      this.totalPages = response.data.paginatedData.meta.total;
      this.currentPage = response.data.paginatedData.meta.current_page - 1;
    } catch (error) {
      console.error('Error:', error.messages);
    }
  }

  setFilter(filter) {
    this.filterType = filter;
  }

  deleteResult(resultId) {
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
        SC.deleteCall(`/assessments/${resultId}`) // Replace with your actual API endpoint
          .then(() => {
            this.getResult = this.getResult.filter((Result) => Result.id !== resultId);
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

  setCurrentResultId(ResultId) {
    this.currentResultId = ResultId;
    this.setCurrentResultData(ResultId);
  }
  

  setCurrentResultData(ResultId) {
    this.currentResultData = this.getResult.find((Result) => Result.id === ResultId) || {};
  }

  get getResultById() {
    return (id) => this.getResult.find((Result) => Result.id === id);
  }
}

export const resultStore = new ResultStore();

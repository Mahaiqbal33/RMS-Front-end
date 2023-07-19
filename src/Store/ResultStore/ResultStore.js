import { makeObservable, observable, action, computed } from 'mobx';
import Swal from 'sweetalert2';
import axios from 'axios';
import { SC } from '../../Services/serverCall';

class ResultStore {
  isPopupOpen = false;
  result = [];
  searchTerm = '';
  filterType = '';
  currentresultId = null;
  currentresultData = {};

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      result: observable,
      searchTerm: observable,
      filterType: observable,
      currentresultId: observable,
      currentresultData: observable,
      setPopupOpen: action.bound,
      filteredresult: computed,
      fetchresult: action,
      deleteresult: action,
      setFilter: action,
      setSearchTerm: action,
      setCurrentresultId: action,
      setCurrentresultData: action,
      getresultById: computed,
    });
  }

  setPopupOpen(value) {
    this.isPopupOpen = value;
  }

  async fetchresult(page,pageSize) {
    try {
      const response = await SC.getCall(`/assessment?page=${page}&limit=${pageSize}`);
      this.result = response.data.data;
      this.pageCount = Math.ceil(response.data.meta.total / pageSize);
      this.currentPage = page;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  deleteresult(resultId) {
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
          .delete(`https://dummyjson.com/users/${resultId}`)
          .then(() => {
            this.result = this.result.filter((result) => result.id !== resultId);
            Swal.fire('Deleted!', 'The record has been deleted.', 'success');
          })
          .catch((error) => {
            console.error('Error:', error);
            Swal.fire('Error!', 'An error occurred while deleting the record.', 'error');
          });
      }
    });
  }

  setFilter(filter) {
    this.filterType = filter;
  }

  setSearchTerm(term) {
    this.searchTerm = term;
  }

  get filteredresult() {
    const { filterType, searchTerm, result } = this;

    return result.filter((result) => {
      if (!result) {
        return false; // Skip null/undefined result objects
      }

      if (!filterType || filterType === 'All') {
        return (
          (result.username && result.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (result.result && result.result.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (result.enrollment && result.enrollment.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      return result[filterType] && result[filterType].toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  setCurrentresultId(resultId) {
    this.currentresultId = resultId;
    this.setCurrentresultData(resultId);
  }

  get getresultById() {
    return (id) => this.result.find((result) => result.id === id);
  }

  setCurrentresultData(resultId) {
    this.currentresultData = this.result.find((result) => result.id === resultId) || {};
  }
}

export const resultStore = new ResultStore();

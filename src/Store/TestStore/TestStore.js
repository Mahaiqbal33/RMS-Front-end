import { makeObservable, observable, action, computed } from 'mobx';
import sweetAlertConfig from '../../Component/Alerts/alertConfig';
import Swal from 'sweetalert2';
import { SC } from '../../Services/serverCall';

class TestStore {
  isPopupOpen = false;
  getTest = [];
  searchTerm = '';
  filterType = '';
   currentTestId = null;
  currenttestData = {};

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      getTest: observable,
      searchTerm: observable,
      filterType: observable,
      currentTestId: observable,
      currenttestData: observable,
      setPopupOpen: action.bound,
      filteredtests: computed,
      fetchtests: action,
      deletetest: action,
      setFilter: action,
      setSearchTerm: action,
       setCurrenttestId: action,
      setCurrenttestData: action, // New action to set current test data
      gettestById: computed,
    });
  }
  setPopupOpen = (value) => {
    this.isPopupOpen = value;
  };

  async fetchtests(page, pageSize) {
    try {
      const response = await SC.getCall(`/attempt?page=${page}&limit=${pageSize}`);
      this.getTest = response.data.data;
      this.pageCount = Math.ceil(response.data.meta.total / pageSize);
      this.currentPage = page;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  



  deletetest(testId) {
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
       SC.deleteCall(`/attempt/${testId}`) // Replace with your actual API endpoint
      .then(() => {
        console.log(testId)
        // Remove the deleted test from the local array
        this.getTest = this.getTest.filter((test) => test.id !== testId);
        sweetAlertConfig.successAlert("test is deleted successfully!")
      })
      .catch((error) => {
        console.error('Error:', error);
        sweetAlertConfig.errorAlert("An error occurred while deleting the test.")
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

  
  get filteredtests() {
    const { filterType, searchTerm, getTest } = this;
  
    return getTest.filter((test) => {
      if (!test) {
        return false; // Skip null/undefined test objects
      }
  
      if (!filterType || filterType === 'All') {
        return (
          (test.name && test.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (test.subject && test.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (test.class && test.class.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
  
      return (test[filterType] && test[filterType].toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }
  

   setCurrenttestId(testId) {
    this.currentTestId = testId;
    this.setCurrenttestData(testId); // Update current test data
  }

  get gettestById() {
    return (id) => this.getTest.find((test) => test.id === id);
  }
  setCurrenttestData(testId) {
    this.currenttestData = this.getTest.find((test) => test.id === testId) || {};
  }
}

export const testStore = new TestStore();

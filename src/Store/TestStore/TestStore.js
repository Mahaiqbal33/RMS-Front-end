import { makeObservable, observable, action, computed } from 'mobx';
import sweetAlertConfig from '../../Component/Alerts/alertConfig';
import Swal from 'sweetalert2';
import axios from 'axios';

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
      setCurrentTestId: action,
      setCurrenttestData: action, // New action to set current test data
      getTestById: computed,
    });
  }
  setPopupOpen = (value) => {
    this.isPopupOpen = value;
  };
  async fetchtests() {
    await axios
      .get('https://dummyjson.com/users') // Replace with your actual API endpoint
      .then((response) => {
        this.getTest = response.data.users;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //pagination functionality
  // async fetchtests(page, pageSize) {
  //   const url = `https://dummyjson.com/users?page=${page}&limit=${pageSize}`;
  
  //   try {
  //     const response = await axios.get(url);
  //     this.getTest = response.data.users;
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }


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
    axios
      .delete(`https://dummyjson.com/users/${testId}`) // Replace with your actual API endpoint
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
          (test.firstName && test.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (test.subject && test.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (test.class && test.class.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (test.email && test.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (test.gender && test.gender.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
  
      return (test[filterType] && test[filterType].toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }
  

  setCurrentTestId(testId) {
    this.currentTestId = testId;
    this.setCurrenttestData(testId); // Update current test data
  }

  get getTestById() {
    return (id) => this.getTest.find((test) => test.id === id);
  }
  setCurrenttestData(testId) {
    this.currenttestData = this.getTest.find((test) => test.id === testId) || {};
  }
}

export const testStore = new TestStore();

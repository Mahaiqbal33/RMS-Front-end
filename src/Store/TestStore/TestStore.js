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
      getTest: observable, // Mark getTest as observable
      searchTerm: observable,
      filterType: observable,
      currentTestId: observable,
      currenttestData: observable,
      setPopupOpen: action.bound,
      fetchtests: action,
      deletetest: action,
      setCurrenttestId: action,
      setCurrenttestData: action, // New action to set current test data
      gettestById: computed,
    });
  }

  setPopupOpen = (value) => {
    this.isPopupOpen = value;
  };

  async fetchtests() {
    try {
      const response = await SC.getCall('/attempts'); // Fetch all the data at once without pagination
      this.getTest = await response.data;
      console.log("hello",this.getTest);
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
        SC.deleteCall(`/attempts/${testId}`) // Replace with your actual API endpoint
          .then(() => {
            console.log(testId);
            // Remove the deleted test from the local array
            this.getTest = this.getTest.filter((test) => test.id !== testId);
            sweetAlertConfig.successAlert("test is deleted successfully!")
          })
          .catch((error) => {
            console.error('Error:', error);
            sweetAlertConfig.errorAlert("An error occurred while deleting the test.")
          });
      }
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

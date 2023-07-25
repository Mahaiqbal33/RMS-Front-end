import { makeObservable, observable, action, computed } from 'mobx';
import Swal from 'sweetalert2';
import axios from 'axios';

class SubjectsStore {
  isPopupOpen = false;
  subjects = [];
  searchTerm = '';
  filterType = '';
  currentSubjectId = null;
  currentSubjectData = {};

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      subjects: observable,
      searchTerm: observable,
      filterType: observable,
      currentSubjectId: observable,
      currentSubjectData: observable,
      setPopupOpen: action.bound,
      filteredSubjects: computed,
      fetchSubjects: action,
      deleteSubject: action,
      setFilter: action,
      setSearchTerm: action,
      setCurrentSubjectId: action,
      setCurrentSubjectData: action,
      getSubjectById: computed,
    });
  }

  setPopupOpen(value) {
    this.isPopupOpen = value;
  }

  async fetchSubjects() {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      this.subjects = response.data.users;
    } catch (error) {
      console.error('Error:', error);
    }
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
        axios
          .delete(`https://dummyjson.com/users/${subjectId}`)
          .then(() => {
            this.subjects = this.subjects.filter((subject) => subject.id !== subjectId);
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

  get filteredSubjects() {
    const { filterType, searchTerm, subjects } = this;

    return subjects.filter((subject) => {
      if (!subject) {
        return false; // Skip null/undefined subjects objects
      }

      if (!filterType || filterType === 'All') {
        return (
          (subject.username && subject.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (subject.subject && subject.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (subject.enrollment && subject.enrollment.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      return subject[filterType] && subject[filterType].toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  setCurrentSubjectId(subjectId) {
    this.currentSubjectId = subjectId;
    this.setCurrentSubjectData(subjectId);
  }

  get getSubjectById() {
    return (id) => this.subjects.find((subject) => subject.id === id);
  }

  setCurrentSubjectData(subjectId) {
    this.currentSubjectData = this.subjects.find((subject) => subject.id === subjectId) || {};
  }
}

export const subjectsStore = new SubjectsStore();

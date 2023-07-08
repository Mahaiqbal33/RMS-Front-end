// import { makeObservable, observable, action, computed } from 'mobx';
// import sweetAlertConfig from '../../Component/Alerts/alertConfig';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// class SubjectsStore {
//   isPopupOpen = false;
//   getsubjects = [];
//   searchTerm = '';
//   filterType = '';
//   currentsubjectsId = null;
//   currentsubjectsData = {};

//   constructor() {
//     makeObservable(this, {
//       isPopupOpen: observable,
//       getsubjects: observable,
//       searchTerm: observable,
//       filterType: observable,
//       currentsubjectsId: observable,
//       currentsubjectsData: observable,
//       setPopupOpen: action.bound,
//       filteredsubjectss: computed,
//       fetchsubjectss: action,
//       deletesubjects: action,
//       setFilter: action,
//       setSearchTerm: action,
//       setCurrentsubjectsId: action,
//       setCurrentsubjectsData: action, // New action to set current subjects data
//       getsubjectsById: computed,
//     });
//   }
//   setPopupOpen = (value) => {
//     this.isPopupOpen = value;
//   };
//   async fetchsubjectss() {
//     await axios
//       .get('https://dummyjson.com/users') // Replace with your actual API endpoint
//       .then((response) => {
//         this.getsubjects = response.data.users;
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }

//   //pagination functionality
//   // async fetchsubjectss(page, pageSize) {
//   //   const url = `https://dummyjson.com/users?page=${page}&limit=${pageSize}`;
  
//   //   try {
//   //     const response = await axios.get(url);
//   //     this.getsubjects = response.data.users;
//   //   } catch (error) {
//   //     console.error('Error:', error);
//   //   }
//   // }


//   deletesubjects(subjectsId) {
//     Swal.fire({
//       title: 'Confirmation',
//       text: 'Are you sure you want to delete this record?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Delete',
//       cancelButtonText: 'Cancel',
//     }).then((result) => {
//       if (result.isConfirmed) {
//     axios
//       .delete(`https://dummyjson.com/users/${subjectsId}`) // Replace with your actual API endpoint
//       .then(() => {
//         console.log(subjectsId)
//         // Remove the deleted subjects from the local array
//         this.getsubjects = this.getsubjects.filter((subjects) => subjects.id !== subjectsId);
//         sweetAlertConfig.successAlert("subjects is deleted successfully!")
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         sweetAlertConfig.errorAlert("An error occurred while deleting the subjects.")
//       });
//     }
//   })
// }

  

//   setFilter(filter) {
//     this.filterType = filter;
//   }

//   setSearchTerm(term) {
//     this.searchTerm = term;
//   }

  
//   get filteredsubjectss() {
//     const { filterType, searchTerm, getsubjects } = this;
  
//     return getsubjects.filter((subjects) => {
//       if (!subjects) {
//         return false; // Skip null/undefined subjects objects
//       }
  
//       if (!filterType || filterType === 'All') {
//         return (
//           (subjects.firstName && subjects.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (subjects.subject && subjects.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (subjects.class && subjects.class.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (subjects.email && subjects.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (subjects.gender && subjects.gender.toLowerCase().includes(searchTerm.toLowerCase()))
//         );
//       }
  
//       return (subjects[filterType] && subjects[filterType].toLowerCase().includes(searchTerm.toLowerCase()));
//     });
//   }
  

//   setCurrentsubjectsId(subjectsId) {
//     this.currentsubjectsId = subjectsId;
//     this.setCurrentsubjectsData(subjectsId); // Update current subjects data
//   }

//   get getsubjectsById() {
//     return (id) => this.getsubjects.find((subjects) => subjects.id === id);
//   }
//   setCurrentsubjectsData(subjectsId) {
//     this.currentsubjectsData = this.getsubjects.find((subjects) => subjects.id === subjectsId) || {};
//   }
  
// }

// export const subjectsStore = new SubjectsStore();
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

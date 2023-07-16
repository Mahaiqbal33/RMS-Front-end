import { makeObservable, observable, action, computed } from 'mobx';
import axios from 'axios';

class FetchApiStore {
    getStudents = [];
    getSubjects=[];
    getTest = [];

  constructor() {
    makeObservable(this, {
      getStudents: observable,
      getSubjects:observable,
      getTest: observable,
      fetchStudents: action,
      fetchSubjects: action,
      fetchtest: action,
    });
  }

  //Fetch Students Api
  async fetchStudents() {
    await axios
      .get('https://dummyjson.com/users') // Replace with your actual API endpoint
      .then((response) => {
        this.getStudents = response.data.users;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

//Fetch Subjects Api
async fetchSubjects() {
    await axios
      .get('https://dummyjson.com/users') // Replace with your actual API endpoint
      .then((response) => {
        this.getSubjects = response.data.users;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


//Fetch Test Api
  async fetchtest() {
    await axios
      .get('https://dummyjson.com/users') // Replace with your actual API endpoint
      .then((response) => {
        this.getTest = response.data.users;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

}

export const fetchApiStore = new  FetchApiStore();
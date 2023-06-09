import { makeObservable, observable, action, toJS } from 'mobx';
import axios from 'axios';
class SubjectFormStore {
  formData = {
    username: '',
    subject: '',
    userId: '',
  };
  userList = [];
  errors = {
    username: '',
    subject: '',
    userId: '',
  };
  showSubjectsCombinationForm=true;

  constructor() {
    makeObservable(this, {
      formData: observable,
      errors: observable,
      userList:observable,
      showSubjectsCombinationForm:observable,
      setShowSubjectsCombinationForm:action,
      setFormData: action,
      resetFormData: action,
      setError: action,
      clearErrors: action,
      fetchUserList:action,
      filterUserId:action,
    });
  }

 async fetchUserList() {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      this.userList = response.data.users;
    } catch (error) {
      console.error('Failed to fetch user list:', error);
    }
  }

  filterUserId() {
    const userListArray = Array.from(this.userList);
    const filteredUser = userListArray.find((user) => user.firstName === this.formData.username);
    if (filteredUser && filteredUser.id) {
      this.formData.userId = toJS(filteredUser.id);
    } else {
      this.formData.userId ='';
    }
    console.log(this.formData.userId);
  }
  
  
  

  setFormData(data) {
    this.formData = data;
  }

  resetFormData() {
    this.formData = {
      username: '',
      subject: '',
      userId: '',
    };
  }

  setError(fieldName, errorMessage) {
    this.errors[fieldName] = errorMessage;
  }

  clearErrors() {
    this.errors = {
      username: '',
      subject: '',
      userId: '',
    };
  }
  setShowSubjectsCombinationForm(value){
    this.showSubjectsCombinationForm= value;
  }
}

export const subjectformStore = new SubjectFormStore();

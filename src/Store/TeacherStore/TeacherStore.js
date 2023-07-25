// TeacherStore.js

import { makeObservable, observable, action, computed } from 'mobx';
import Swal from 'sweetalert2';
import { SC } from '../../Services/serverCall';
import {toJS } from 'mobx'
import axios from 'axios';

class TeacherStore {
  isPopupOpen = false;
  getTeacher = [];
  filterType="";
  searchTerm = '';
  currentTeacherId = null;
  currentTeacherData = {};
  currentPage = 0;
  entriesPerPage = 10;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      getTeacher: observable,
      filterType:observable,
      searchTerm: observable,
      currentTeacherId: observable,
      currentTeacherData: observable,
      currentPage: observable,
      entriesPerPage: observable,
      totalPages: observable,
      setPopupOpen: action,
      setFilter:action,
      fetchTeachers: action,
      deleteTeacher: action,
      setSearchTerm: action,
      setCurrentTeacherId: action,
      setCurrentTeacherData: action,
      getTeacherById: computed,
    });
  }

  setPopupOpen = (value) => {
    this.isPopupOpen = value;
  };

  async fetchTeachers() {
    try {
      const response = await SC.postCall('/teachers/pagination', {
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

      this.getTeacher = response.data.teachers.data;
       console.log("this.getTeacher",toJS(this.getTeacher))
      this.totalPages = response.data.teachers.meta.total;
      this.currentPage = response.data.teachers.meta.current_page - 1;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  setFilter(filter) {
    this.filterType = filter;
  }

  deleteTeacher(teacherId) {
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
          .delete(`https://dummyjson.com/users/${teacherId}`) // Replace with your actual API endpoint
          .then(() => {
            this.getTeacher = this.getTeacher.filter((teacher) => teacher.id !== teacherId);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  }

  setSearchTerm(term) {
    this.searchTerm = term;
  }

  setCurrentTeacherId(teacherId) {
    this.currentTeacherId = teacherId;
    this.setCurrentTeacherData(teacherId);
  }

  setCurrentTeacherData(teacherId) {
    this.currentTeacherData = this.getTeacher.find((teacher) => teacher.id === teacherId) || {};
  }

  get getTeacherById() {
    return (id) => this.getTeacher.find((teacher) => teacher.id === id);
  }
}

export const teacherStore = new TeacherStore();

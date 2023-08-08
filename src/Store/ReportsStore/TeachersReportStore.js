import { makeObservable, observable, action, computed } from 'mobx';
import { SC } from '../../Services/serverCall';
import { toJS } from 'mobx';

class TeachersReportStore {
  isTeacherPopupOpen = false;
  teacherReportList = [];
  teacherFilterType = "";
  teacherSearchTerm = '';
  currentTeacherReportId = null;
  currentTeacherReportData = {};
  currentTeacherPage = 0;
  teacherEntriesPerPage = 4;
  teacherTotalPages = 0;


  constructor() {
    makeObservable(this, {
      isTeacherPopupOpen: observable,
      teacherReportList: observable,
      teacherFilterType: observable,
      teacherSearchTerm: observable,
      currentTeacherReportId: observable,
      currentTeacherReportData: observable,
      currentTeacherPage: observable,
      teacherEntriesPerPage: observable,
      teacherTotalPages: observable,
      setTeacherPopupOpen: action,
      setTeacherFilterType: action,
      fetchTeacherReports: action,
      setCurrentTeacherPage: action,
      setTeacherSearchTerm: action,
      getTeacherReportById: computed,
    });
  }

  setTeacherPopupOpen = (value) => {
    this.isTeacherPopupOpen = value;
  };

  async fetchTeacherReports() {
    try {
      const response = await SC.postCall('/assessments/pagination', {
        page: this.currentTeacherPage + 1,
        page_size: this.teacherEntriesPerPage,
        sort: {
          column: 'created_at',
          order: 'desc',
        },
        filter: [
          {
            columns: [this.teacherFilterType],
            operation: 'like',
            value: this.teacherSearchTerm,
          },
        ],
      });
      this.teacherReportList = response.data.paginatedData.data || [];
      console.log("this.teacherReportList", toJS(this.teacherReportList))
      this.teacherTotalPages = response.data.paginatedData.meta.total;
      this.currentTeacherPage = response.data.paginatedData.meta.current_page - 1;
    } catch (error) {
      console.error('Error:', error.messages);
    }
  }

  setTeacherFilterType = (filter) => {
    this.teacherFilterType = filter;
  }


  
  setCurrentTeacherPage = (pageNumber) => {
    this.currentTeacherPage = pageNumber;
  }

  setTeacherSearchTerm = (term) => {
    this.teacherSearchTerm = term;
  }

  setCurrentTeacherReportId = (reportId) => {
    this.currentTeacherReportId = reportId;
  }
  


  get getTeacherReportById() {
    return (id) => this.teacherReportList.find((report) => report.id === id);
  }

  setViewReportPopupOpen = (value) => {
    this.isViewReportPopupOpen = value;
  };

 
  

}

export const teachersReportStore = new TeachersReportStore();

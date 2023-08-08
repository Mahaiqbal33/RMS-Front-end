// DashboardStore.js
import { makeObservable, observable, action } from 'mobx';
import { SC } from '../../Services/serverCall';
class DashboardStore {
  totalTeachers = 0;
  totalFirstYearStudents = 0;
  totalSecondYearStudents = 0;

  constructor() {
    makeObservable(this, {
      totalTeachers: observable,
      totalFirstYearStudents: observable,
      totalSecondYearStudents: observable,
      fetchDataAndSetCounts: action,
    });
  }

  async fetchDataAndSetCounts() {
    try {
      const teachersResponse = await SC.getCall('/total-teachers');
      this.totalTeachers = await teachersResponse.data.totalTeachers;
      
      const firstYearResponse = await SC.getCall('/total-1y-students');
      this.totalFirstYearStudents =await firstYearResponse.data.totalFirstYearStd;

      const secondYearResponse = await SC.getCall('/total-2y-students');
      this.totalSecondYearStudents =await secondYearResponse.data.totalSecondYearStd;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

export const dashboardStore = new DashboardStore();

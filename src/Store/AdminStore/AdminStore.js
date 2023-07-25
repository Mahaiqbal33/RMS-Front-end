import { makeObservable, observable, action, computed } from 'mobx';
import sweetAlertConfig from '../../Component/Alerts/alertConfig';
import Swal from 'sweetalert2';
import { SC } from '../../Services/serverCall';

class AdminStore {
  isPopupOpen = false;
  getAdmin = [];
  currentAdminId = null;
  currentAdminData = {};

  constructor() {
    makeObservable(this, {
      isPopupOpen: observable,
      getAdmin: observable,
      currentAdminId: observable,
      currentAdminData: observable,
      setPopupOpen: action,
     fetchAdmins: action,
      deleteAdmin: action,
      setCurrentAdminId: action,
      setCurrentAdminData: action,
      getAdminById: computed,
    });
  }

  setPopupOpen = (value) => {
    this.isPopupOpen = value;
  };
  
  fetchAdmins = action(async () => {
    try {
      if (this.getAdmin.length === 0) {
        const response = await SC.getCall('/admins');
        this.getAdmin = response.data;
        console.log('API Response:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  deleteAdmin(adminId) {
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
        SC.deleteCall(`/admins/${adminId}`)
        .then(() => {
          this.getAdmin = this.getAdmin.filter((admin) => admin.id !== adminId);
          sweetAlertConfig.successAlert("Admin is deleted successfully!")
        })
        .catch((error) => {
          console.error('Error:', error);
          sweetAlertConfig.errorAlert("An error occurred while deleting the admin.")
        });
      }
    });
  }

  setCurrentAdminId(adminId) {
    this.currentAdminId = adminId;
    this.setCurrentAdminData(adminId);
  }

  setCurrentAdminData(adminId) {
    this.currentAdminData = this.getAdmin.find((admin) => admin.id === adminId) || {};
  }

  get getAdminById() {
    return (id) => this.getAdmin.find((admin) => admin.id === id);
  }
}

export const adminStore = new AdminStore();

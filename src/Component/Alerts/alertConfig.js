import Swal from 'sweetalert2';

const sweetAlertConfig = {
  successAlert: (message) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: message,
      showConfirmButton: false,
      timer: 3000
    })
  },
  errorAlert: (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      showConfirmButton:false,
      timer:3000
    })
  },
};

export const deleteConfirmation={
  deleteConfirmation:()=>{
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this teacher?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    })
  }
}

export default sweetAlertConfig;

import Swal from 'sweetalert2';
export const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expiresAt');
  
    if (!token || !expiresAt) {
      // Token or expiration date not found, consider it as expired
      return true;
    }
  
    const expirationDate = new Date(expiresAt);
    const currentDate = new Date();
  
    return currentDate >= expirationDate;
  };

  export const showSessionTimeoutAlert = () => {
    Swal.fire({
      title: 'Session Timeout',
      text: 'Your session has expired. Please log in again.',
      icon: 'warning',
      timer: 3000, // Auto close the alert after 3 seconds
      confirmButtonText: 'OK',
      allowOutsideClick: false, // Prevent users from dismissing the alert by clicking outside of it
    }).then(() => {
      // Redirect to the login page after showing the alert
      window.location.href = '/';
    });
  };
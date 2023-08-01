import Swal from 'sweetalert2';

const checkTokenExpiration = (navigate) => {
  const tokenData = JSON.parse(localStorage.getItem('userToken'));
  if (tokenData) {
    const { expirationTime } = tokenData;
    const currentTime = new Date();
    const expirationTimeDate = new Date(expirationTime);
    if (currentTime >= expirationTimeDate) {
      // Token has expired, show SweetAlert and redirect to login page
      Swal.fire({
        title: 'Token Expired',
        text: 'Your session has expired. Please log in again.',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        // Perform any additional actions upon expiration, like clearing user data and redirecting to the login page
        localStorage.clear();
        navigate('/');
      });
    }
  }
};

export default checkTokenExpiration;

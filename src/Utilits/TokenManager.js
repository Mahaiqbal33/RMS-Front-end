import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const TokenManager =  () => {
  const [isTokenExpired, setTokenExpired] = useState(false);
  const navigate = useNavigate();
  console.log("token expire:", isTokenExpired);

  // Function to check if the token is expired
  const checkTokenExpiration =  () => {
    const userToken  =  localStorage.getItem('userToken');
    console.log("usertoke...",userToken )

    try {
   
      if(userToken){
        const { expirationTime } = userToken;
        const currentTime = Date.now();
        if (currentTime > Date.parse(expirationTime)) {
          setTokenExpired(true);
          // Set the userTokenExpired key in local storage when the token expires
          localStorage.setItem('userTokenExpired', 'true');
        } else {
          setTokenExpired(false);
  
          // Calculate the time remaining until token expiration
          const timeRemaining = Date.parse(expirationTime) - currentTime;
  
        }
      }
    } catch (error) {
      alert(error)
      // setTokenExpired(false); // Invalid token format, consider it as expired
    }
  }
  ;

  // Function to show SweetAlert message when the token expires
  const showSessionTimeoutAlert = () => {
    Swal.fire({
      title: 'Session Expired',
      text: 'Your session has expired. Please log in again.',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    }).then(() => {
      // Clear the userToken key from local storage to remove expired token data
      localStorage.removeItem('userToken');
      navigate('/'); // Navigate to the login page when the session expires
    });
  };

  useEffect(() => {
    // Check token expiration on component mount
    checkTokenExpiration();

    // Event listener to listen for changes in local storage
    const storageEventListener = (event) => {
      if (event.key === 'userTokenExpired' && event.newValue === 'true') {
        setTokenExpired(true);
      }
    };

    window.addEventListener('storage', storageEventListener);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', storageEventListener);
    };
  }, []);

  useEffect(() => {
    // Show the popup when the token expires
    if (isTokenExpired) {
      showSessionTimeoutAlert();
    }
  }, [isTokenExpired]);

  return null; // This component doesn't render anything, it just manages token expiration logic.
};

export default TokenManager;

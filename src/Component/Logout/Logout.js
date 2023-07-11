import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      // Make a request to logout endpoint
      await axios.post('http://localhost:3333/logout');

      // Remove token and expiration date from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('token_expires_at');

      // Redirect or perform any desired actions after successful logout
    } catch (error) {
      // Handle logout error
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

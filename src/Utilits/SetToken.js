export const setToken = (accessToken, expirationTime, role) => {
    localStorage.setItem('userToken', JSON.stringify({ accessToken, expirationTime, role }));
  };
  
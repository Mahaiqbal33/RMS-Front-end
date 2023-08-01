import { makeObservable, observable, action } from 'mobx';
import { Outlet, Navigate } from 'react-router-dom';

class PrivateRoutes {
  token = false;

  constructor() {
    makeObservable(this, {
      token: observable,
      renderProtectedRoutes: action.bound,
    });

    // Check for the token in local storage during construction
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      this.token = true;
    }
  }

  setToken(tokenValue) {
    this.token = tokenValue;
    // Store the token in local storage
    localStorage.setItem('token', tokenValue ? 'true' : 'false');
  }

  renderProtectedRoutes() {
    // return this.token ? <Outlet /> : <Navigate to="/" />;
    return this.token ? <Outlet /> : <Navigate to="/" />;
  }
}

export const privateRoutes = new PrivateRoutes();

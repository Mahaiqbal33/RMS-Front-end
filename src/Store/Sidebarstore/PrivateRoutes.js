import { makeObservable, observable, action } from 'mobx';
import { Outlet, Navigate } from 'react-router-dom';

class PrivateRoutes {
  token = false;

  constructor() {
    makeObservable(this, {
      token: observable,
      renderProtectedRoutes: action.bound,
    });
  }

  renderProtectedRoutes() {
    // return this.token ? <Outlet /> : <Navigate to="/" />;
    return this.token ? <Outlet /> :<Outlet />;
  }
}

export const privateRoutes = new PrivateRoutes();

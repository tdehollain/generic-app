import React from 'react';
import { Button } from '@blueprintjs/core';
import { useAuth0 } from '../Auth/react-auth0-spa';
import './loginPage.css';

const LoginPage = props => {
  const { loginWithRedirect, isAuthenticated, loading } = useAuth0();

  return (
    <div className="loginPage bp3-dark">
      <Button
        large
        loading={isAuthenticated === undefined ? true : loading}
        onClick={() => loginWithRedirect({ redirect_uri: window.location.href })}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginPage;

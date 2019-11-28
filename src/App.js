import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from './LoginPage/LoginPage';
import MainContainer from './MainContainer/MainContainer';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './App.css';

import { appName } from './utils/appDefinitions';

import { useAuth0 } from './Auth/react-auth0-spa';
import LoadingPage from './LoadingPage/LoadingPage';

const App = () => {
  // Set the document title
  React.useEffect(() => {
    document.title = appName;
  }, []);

  const { isAuthenticated } = useAuth0();

  if (isAuthenticated === undefined || isAuthenticated === false) {
    document.body.style = 'background: #293742';
  } else {
    document.body.style = 'background: #F5F8FA';
  }

  return (
    <div className="App">
      {isAuthenticated === undefined ? (
        <LoadingPage />
      ) : (
        <Switch>
          <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/" /> : <LoginPage />}
          </Route>
          <Route path="/">{isAuthenticated ? <MainContainer /> : <Redirect to="/login" />}</Route>
        </Switch>
      )}
    </div>
  );
};

export default App;

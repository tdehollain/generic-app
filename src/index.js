import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Auth0Provider } from './Auth/react-auth0-spa';
import history from './utils/history';
import config from './Auth/auth_config.json';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState({}, document.title, appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <Router history={history}>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById('root')
);
registerServiceWorker();

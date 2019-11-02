import React from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import createAuth0Client from '@auth0/auth0-spa-js';

const NavBarContainer = props => {
  // const [user, setUser] = React.useState();
  // const [auth0, setAuth0] = React.useState();

  // // On mount: create auth0 client
  // React.useEffect(() => {
  //   const initAuth0 = async () => {
  //     const auth0Client = await createAuth0Client({
  //       domain: 'masterplan.auth0.com',
  //       client_id: 'bFDnmMhoWmb7ceSVviDzq85OkjKNk8ke'
  //     });
  //     setAuth0(auth0Client);
  //   };
  //   initAuth0();
  // }, []);

  // // When user changes, alert
  // React.useEffect(() => {
  //   alert(user);
  // }, [user]);

  // const handleClickLogin = async () => {
  //   await auth0.loginWithPopup({
  //     redirect_uri: 'http://localhost:3001/login'
  //   });
  //   const user = await auth0.getUser();
  //   setUser(user);
  //   console.log(user);
  // };
  // const handleClickSignup = () => {
  //   alert('signup');
  // };

  return (
    <NavBar
      isAuthenticated={props.isAuthenticated}
      username={props.username}
      // handleClickLogin={handleClickLogin}
      // handleClickSignup={handleClickSignup}
    />
  );
};

function mapStateToProps(store) {
  const { username, isAuthenticated } = store.userReducer;
  return { username, isAuthenticated };
}

export default connect(mapStateToProps)(NavBarContainer);

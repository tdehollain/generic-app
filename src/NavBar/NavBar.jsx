import React from 'react';
import { Button, Navbar, Alignment } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../Auth/react-auth0-spa';

const NavBar = props => {
  const { logout } = useAuth0();

  return (
    <Navbar fixedToTop={true} className="Navbar bp3-dark">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading className="Heading">
          <Link to="/">{props.appName}</Link>
        </Navbar.Heading>
        <Navbar.Divider></Navbar.Divider>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button icon="log-out" onClick={() => logout({ redirect_uri: window.location.host + '/login' })}>
          Log out
        </Button>
      </Navbar.Group>
    </Navbar>
  );
};

export default NavBar;

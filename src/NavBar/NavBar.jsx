import React from 'react';
import { Button, Navbar, Alignment } from '@blueprintjs/core';
import LoggedMenu from './UserMenu/LoggedMenu';
import NotLoggedMenu from './UserMenu/NotLoggedMenu';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../Auth/react-auth0-spa';

const NavBar = props => {
  const { logout } = useAuth0();
  // const userMenu = this.props.isAuthenticated ? (
  //   <LoggedMenu />
  // ) : (
  //   <NotLoggedMenu
  //     handleLogout={this.props.handleLogout}
  //     handleClickLogin={this.props.handleClickLogin}
  //     handleClickSignup={this.props.handleClickSignup}
  //   />
  // );
  return (
    <Navbar className="Navbar bp3-dark">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading className="Heading">
          <Link to="/">App name</Link>
        </Navbar.Heading>
        <Navbar.Divider></Navbar.Divider>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button icon="log-out" onClick={() => logout({ redirect_uri: 'http://localhost:3001/login' })}>
          Log out
        </Button>
      </Navbar.Group>
    </Navbar>
  );
};

export default NavBar;

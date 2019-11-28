import React from 'react';
import NavBar from './NavBar';
import appDefinitions from '../utils/appDefinitions.json';

const NavBarContainer = props => {
  return <NavBar appName={appDefinitions.appName} />;
};

export default NavBarContainer;

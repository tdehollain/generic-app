import React from 'react';
import NavBar from './NavBar';
import { appName } from '../utils/appDefinitions';

const NavBarContainer = props => {
  return <NavBar appName={appName} />;
};

export default NavBarContainer;

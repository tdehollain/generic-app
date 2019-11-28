import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from '../NavBar/NavBarContainer';
import SideBar from '../Components/SideBar';
import { sideBarItems } from '../utils/appDefinitions';
// imoprt components as defined in appDefinitions
import Home from '../AppModules/Home/Home/Home';

const MainContainer = () => {
  const style = {
    margin: '50px 0 0 67px',
    padding: '5px'
  };

  return (
    <div className="mainContainer" style={style}>
      <NavBarContainer />
      <SideBar items={sideBarItems} />
      <Switch>
        <Route path={'/Home/Home'} component={Home} />;
      </Switch>
    </div>
  );
};

export default MainContainer;

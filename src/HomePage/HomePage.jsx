import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBarContainer from '../NavBar/NavBarContainer';
import SideBar from '../Components/SideBar';

class HomeView extends Component {
  render() {
    const style = {
      background: '#F5F8FA',
      width: '100%'
    };

    return (
      <div>
        <NavBarContainer />
        <SideBar />
        <div style={style} className="container">
          <p>You are signed in!</p>
          <p>Username: {this.props.username}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { username } = store.userReducer;
  return { username };
}

export default connect(mapStateToProps)(HomeView);

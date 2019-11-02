import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

class NotLoggedMenu extends Component {
  render() {
    return (
      <ul>
        <li>
          <Button icon="log-in" onClick={this.props.handleClickLogin}>
            Log in
          </Button>
        </li>
        <li>
          <Button icon="plus" onClick={this.props.handleClickSignup}>
            Sign up
          </Button>
        </li>
      </ul>
    );
  }
}

export default NotLoggedMenu;

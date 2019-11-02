import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

class LoggedMenu extends Component {
	render() {
		return (
			<ul>
				<li>
					<Link to='/usersettings'>
						<Button icon='user'>
							User Settings
						</Button>
					</Link>
				</li>
				<li>
					<Link to='/changepassword'>
						<Button icon='key'>
							Change Password
						</Button>
					</Link>
				</li>
				<li>
					<Link to='/login'>
						<Button icon='log-out'>
							Log out
						</Button>
					</Link>
				</li>
			</ul>
		)
	}
}

const mapStateToProps = state => {
	return {
		username: state.userReducer.username
	}
}

export default connect(mapStateToProps)(LoggedMenu);
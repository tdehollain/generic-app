import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@blueprintjs/core'

export default class MenuGroup extends Component {
	render() {
		return (
			<div className='MenuGroup'>
				<p className='MenuGroupTitle'>
					<Icon icon={this.props.iconName} iconSize='20' />
					{this.props.name}
				</p>
				{this.props.items.map(item => {
					return (
						<Link className='MenuGroupItem' key={item} to={`/${this.props.name}/${item.replace(/ /g, '')}`}>
							{item}
						</Link>
					)
				})}
			</div>
		);
	}
}
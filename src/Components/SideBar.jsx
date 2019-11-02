
import React, { Component } from 'react';
import MenuGroup from './MenuGroup';
import './SideBar.css';

export default class SideBar extends Component {
	render() {
		return (
			<div className='SideBar'>
				<MenuGroup
					name='Data'
					iconName='database'
					items={['Upload', 'Run', 'Refine']}
				/>
				<MenuGroup
					name='Analysis'
					iconName='timeline-line-chart'
					items={['Dashboard', 'Standard Analyses', 'Custom Analyses', 'ROI Tree', 'Variance Waterfall']}
				/>
				<MenuGroup
					name='Planning'
					iconName='timeline-events'
					items={['Overview', 'Calendar', 'Budget Opimizer']}
				/>
			</div >
		);
	}
}
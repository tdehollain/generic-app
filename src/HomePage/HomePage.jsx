import React from 'react';
import NavBarContainer from '../NavBar/NavBarContainer';
import SideBar from '../Components/SideBar';

const HomePage = () => {
  const style = {
    background: '#F5F8FA',
    width: '100%'
  };

  const sideBarItems = [
    {
      name: 'Data',
      iconName: 'database',
      items: ['Data Generator', 'Upload', 'Run']
    },
    {
      name: 'Analysis',
      iconName: 'timeline-line-chart',
      items: ['Dashboard', 'Standard Analyses', 'Custom Analyses', 'ROI Tree', 'Variance Waterfall']
    },
    {
      name: 'Planning',
      iconName: 'timeline-events',
      items: ['Overview', 'Calendar', 'Budget Optimizer']
    }
  ];

  return (
    <div style={style}>
      <NavBarContainer />
      <SideBar items={sideBarItems} />
      <div style={{ width: '300px', margin: '200px auto' }} className="container">
        <p>You are signed in!</p>
      </div>
    </div>
  );
};

export default HomePage;

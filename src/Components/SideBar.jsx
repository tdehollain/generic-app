import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '@blueprintjs/core';
import './SideBar.css';

const SideBar = ({ items }) => {
  const [activeGroup, setActiveGroup] = React.useState(['']);
  const [loadedItem, setLoadedItem] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  // When items changes, validate that there are no duplicates (show warning if so)

  // When mounting: set the loaded item corresponding to the URL
  React.useEffect(() => {
    for (let item of items) {
      for (let subItem of item.items) {
        const pathName = '/' + encodeURI(item.name) + '/' + encodeURI(subItem);
        if (pathName === window.location.pathname) {
          setLoadedItem(pathName);
        }
      }
    }
  }, []);

  const handleClickGroupTitle = groupTitle => {
    isOpen && (groupTitle === activeGroup ? setActiveGroup('') : setActiveGroup(groupTitle));
  };
  const handleClickLink = (groupName, itemPathName) => {
    setActiveGroup(groupName);
    setLoadedItem(itemPathName);
  };
  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={'SideBar ' + (isOpen ? 'open' : '')}>
      <Button className="openCloseButton" minimal onClick={handleOpenClose}>
        <Icon icon={isOpen ? 'cross' : 'menu'} iconSize="25"></Icon>
      </Button>
      {items.map((item, id) => (
        <MenuGroup
          key={item.name}
          name={item.name}
          active={item.name === activeGroup}
          iconName={item.iconName}
          items={item.items}
          sidebarIsOpen={isOpen}
          loadedItem={loadedItem}
          // loadedItem={item.name === activeGroup ? loadedItem : null}
          handleClickGroupTitle={handleClickGroupTitle}
          handleClickLink={handleClickLink}
          calculatedTop={(63 + (id + 1) * 58).toString() + 'px'}
        />
      ))}
    </div>
  );
};

export default SideBar;

const MenuGroup = ({ name, active, iconName, items, sidebarIsOpen, loadedItem, handleClickGroupTitle, handleClickLink, calculatedTop }) => {
  return (
    <div className={'MenuGroup ' + (sidebarIsOpen ? '' : 'isClosed')}>
      <div className={'MenuGroupHeader ' + (active ? 'active' : '')} onClick={() => handleClickGroupTitle(name)}>
        <Icon icon={iconName} iconSize="25" />
        {sidebarIsOpen && <span className="MenuGroupTitle">{name}</span>}
      </div>
      {sidebarIsOpen &&
        active &&
        items.map(item => {
          const itemPathName = '/' + encodeURI(name) + '/' + encodeURI(item);
          const isTheLoadedItem = loadedItem === itemPathName;
          return (
            <Link
              className={'MenuGroupItem ' + (isTheLoadedItem ? 'active' : '')}
              key={item}
              to={itemPathName}
              onClick={() => handleClickLink(name, itemPathName)}
            >
              {item}
            </Link>
          );
        })}
      <div className="MenuGroupHover" style={{ top: calculatedTop }}>
        <p className="MenuGroupHoverTitle">{name}</p>
        <hr style={{ margin: '10px' }} />
        {items.map(item => {
          const itemPathName = '/' + encodeURI(name) + '/' + encodeURI(item);
          const isTheLoadedItem = loadedItem === itemPathName;
          return (
            <Link
              className={'MenuGroupHoverItem ' + (isTheLoadedItem ? 'active' : '')}
              key={item}
              to={itemPathName}
              onClick={() => handleClickLink(name, itemPathName)}
            >
              {item}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

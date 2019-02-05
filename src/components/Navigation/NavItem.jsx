import React from 'react';
import PropTypes from 'prop-types';

const NavItem = ({ item }) => (
  <li className="nav-list__item">
    <a className="nav-list__link" href={item.link}>
      {item.text}
    </a>
  </li>
);

NavItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired
};
export default NavItem;

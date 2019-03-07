import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ item }) => (
  <li key={item.id}>
    <a href={item.link}>{item.title}</a>
  </li>
);

Item.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Item;

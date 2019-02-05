import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ l }) => (
  <li>
    <a href={l.link}>{l.label}</a>
  </li>
);

Link.propTypes = {
  l: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Link;

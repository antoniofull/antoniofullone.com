import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ l }) => (
  <li>
    <i className="fas fa-cloud-download-alt" />
    <a href={l.link}>{l.label}</a>
  </li>
);

Link.propTypes = {
  l: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Link;

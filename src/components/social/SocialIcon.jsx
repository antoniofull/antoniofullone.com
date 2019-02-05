import React from 'react';
import PropTypes from 'prop-types';

const SocialIcon = ({ icon }) => {
  return (
    <li key={icon.id}>
      <a href={icon.link}>
        <i className={`${icon.style} fa-${icon.icon}`} />
      </a>
    </li>
  );
};

SocialIcon.propTypes = {
  icon: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SocialIcon;

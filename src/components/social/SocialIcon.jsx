import React from 'react';
import PropTypes from 'prop-types';

import { ThemeConsumer } from '../ThemeContext';

const SocialIcon = ({ icon }) => (
  <ThemeConsumer>
    {({ toggleEmailMenu }) => (
      <li key={icon.id}>
        <a
          href={icon.link}
          onClick={icon.link === 'mailto' ? toggleEmailMenu : undefined}
        >
          <i className={`${icon.style} fa-${icon.icon}`} />
        </a>
      </li>
    )}
  </ThemeConsumer>
);

SocialIcon.propTypes = {
  icon: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SocialIcon;

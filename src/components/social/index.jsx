/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';

import SocialIcon from './SocialIcon';

const Social = ({ data }) => (
  <React.Fragment>
    <h3 className="footer-header">Connect</h3>
    <ul>
      {data.map(icon => (
        <SocialIcon icon={icon} key={icon.id} />
      ))}
    </ul>
  </React.Fragment>
);

Social.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Social;

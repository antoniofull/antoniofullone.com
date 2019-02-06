import React from 'react';
import PropTypes from 'prop-types';

import Social from '../social';
import Files from '../files';
import Websites from '../websites';

const AsideContent = ({ socialData, files, websites }) => (
  <React.Fragment>
    <div className="social">
      <Social data={socialData} />
    </div>
    <div className="files">
      <Files data={files} />
    </div>
    <div className="websites">
      <Websites data={websites} />
    </div>
  </React.Fragment>
);

AsideContent.propTypes = {
  socialData: PropTypes.arrayOf(PropTypes.any).isRequired,
  files: PropTypes.arrayOf(PropTypes.any).isRequired,
  websites: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default AsideContent;

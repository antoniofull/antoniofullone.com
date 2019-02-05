import React from 'react';
import PropTypes from 'prop-types';

const File = ({ file }) => (
  <li>
    <a href={file.link}>{file.label}</a>
  </li>
);

File.propTypes = {
  file: PropTypes.objectOf(PropTypes.any).isRequired
};

export default File;

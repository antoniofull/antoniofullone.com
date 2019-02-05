import React from 'react';
import PropTypes from 'prop-types';
import File from './File';

const Files = ({ data }) => (
  <React.Fragment>
    <h3 className="">Files</h3>
    <ul>
      {data.map(file => (
        <File file={file} key={file.id} />
      ))}
    </ul>
  </React.Fragment>
);

Files.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default Files;

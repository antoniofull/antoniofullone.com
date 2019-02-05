import React from 'react';
import PropTypes from 'prop-types';
import Website from './Website';

const Links = ({ data }) => (
  <React.Fragment>
    <h3 className="">Other Links</h3>
    <ul>
      {data.map(l => (
        <Website l={l} key={l.id} />
      ))}
    </ul>
  </React.Fragment>
);

Links.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default Links;

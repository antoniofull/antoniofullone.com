import React from 'react';

import PropTypes from 'prop-types';

const Header = ({ children }) => (
  <header className="site-header bg-white has-shadows" role="banner">
    <div className="container grid-align-center">{children}</div>
  </header>
);

Header.propTypes = {
  children: PropTypes.node.isRequired
};

export default Header;

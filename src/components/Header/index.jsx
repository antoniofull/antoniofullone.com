import React from 'react';

import PropTypes from 'prop-types';

const Header = ({ children }) => (
  <header className="site-header has-shadows has-gutter-outside" role="banner">
    <div className="container grid grid-align-center">{children}</div>
  </header>
);

Header.propTypes = {
  children: PropTypes.node.isRequired
};

export default Header;

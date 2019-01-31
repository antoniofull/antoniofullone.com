import React from 'react';

import PropTypes from 'prop-types';

const Header = ({ children }) => (
  <header className="site-header bg-white has-shadows" role="banner">
    <div className="container container--grid grid-col-4 grid-align-center">
      {children}
    </div>
  </header>
);

Header.propTypes = {
  children: PropTypes.node.isRequired
};

export default Header;

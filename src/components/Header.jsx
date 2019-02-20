import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ThemeConsumer } from './ThemeContext';

import '../styles/header.css';

const Header = props => {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <header
          className={classNames(
            theme,
            'site-header',
            { 'has-shadows': theme === 'white' },
            { 'bg-white': theme === 'white' },
            'has-gutter-outside'
          )}
          role="banner"
        >
          <div className="container grid grid-align-center">
            {props.children}
          </div>
        </header>
      )}
    </ThemeConsumer>
  );
};
Header.propTypes = {
  children: PropTypes.node.isRequired
};

export default Header;

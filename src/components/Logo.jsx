import React from 'react';
import LogoImg from '../images/logo.svg';
import { Link } from 'gatsby';

import { ThemeConsumer } from './ThemeContext';

const Logo = () => (
  <ThemeConsumer>
    {({ scroll }) => (
      <div className="logo">
        <Link
          aria-label="Go to Home Page"
          to={'/'}
          onClick={scroll}
          className="logo__link"
        >
          <LogoImg className="logo__img" />
        </Link>
      </div>
    )}
  </ThemeConsumer>
);

export default Logo;

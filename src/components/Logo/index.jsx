import React from 'react';
import LogoImg from '../../images/logo.svg';

import { ThemeConsumer } from '../ThemeContext';

const Logo = () => (
  <ThemeConsumer>
    {({ scroll }) => (
      <div className="logo">
        <a href="#home" onClick={scroll} className="logo__link">
          <LogoImg className="logo__img" />
        </a>
      </div>
    )}
  </ThemeConsumer>
);

export default Logo;

import React from 'react';
import Observable from '../Observable';
import { ThemeConsumer } from '../ThemeContext';

const FooterTitle = () => (
  <ThemeConsumer>
    {({ animateElement }) => (
      <Observable
        element="h2"
        callback={animateElement}
        data-animation="fadeInUp"
        className="site-footer__header tisa text-white"
      >
        Thank you for visiting my website. Here some extra links selected just
        for you.
      </Observable>
    )}
  </ThemeConsumer>
);

export default FooterTitle;

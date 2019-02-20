import React from 'react';

import { ThemeConsumer } from '../components/ThemeContext';
import IndexLayout from '../layouts/IndexLayout';
import Observable from '../components/Observable';
import HomePageTemplate from '../templates/HomePageTemplate';
import Footer from '../components/Footer';

const Index = () => (
  <ThemeConsumer>
    {({ animateElement }) => (
      <IndexLayout>
        <HomePageTemplate />
        <Observable
          element="footer"
          id="site-footer"
          data-theme="primary-light"
          config={{ threshold: 0.3 }}
          className="site-footer"
          callback={animateElement}
        >
          <Footer />
        </Observable>
      </IndexLayout>
    )}
  </ThemeConsumer>
);

export default Index;

import React from 'react';

import { ThemeConsumer } from '../components/ThemeContext';
import Observable from '../components/Observable';
import Main from '../components/main/Main';
import About from '../components/about/About';
import Work from '../components/work/Work';

const HomePageTemplate = () => (
  <ThemeConsumer>
    {({ animateElement }) => (
      <main className="index" role="main">
        <section element="section" id="intro" className="main-section">
          <Main />
        </section>
        <Observable
          element="section"
          className="about-section"
          id="about"
          config={{ threshold: 0.3 }}
          callback={animateElement}
        >
          <About />
        </Observable>
      </main>
    )}
  </ThemeConsumer>
);

export default HomePageTemplate;

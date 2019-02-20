import React from 'react';

import { ThemeConsumer } from '../components/ThemeContext';
import Observable from '../components/Observable';
import Main from '../components/Main/Intro';
import About from '../components/about/About';
import Work from '../components/work/Work';
import Footer from '../components/Footer';

const HomePageTemplate = () => (
  <ThemeConsumer>
    {({ animateElement }) => (
      <main className="index" role="main">
        <section element="section" id="intro" className="main-section">
          <Main />
        </section>
        <Observable
          element="section"
          data-theme="white"
          className="about-section"
          id="about"
          config={{ threshold: 0.3 }}
          callback={animateElement}
        >
          <About />
        </Observable>
        <Observable
          element="section"
          id="work"
          data-theme="secondary-light"
          config={{ threshold: 0.2 }}
          className="work-section container has-gutter-outside"
          callback={animateElement}
        >
          <Work />
        </Observable>
      </main>
    )}
  </ThemeConsumer>
);

export default HomePageTemplate;

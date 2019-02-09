/* eslint-disable */
import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import PageContainer from './src/components/PageContainer';
import Header from './src/components/header';
import Logo from './src/components/logo';
import Navigation from './src/components/navigation';
import Main from './src/components/main';
import About from './src/components/about';
import Work from './src/components/work';
import Footer from './src/components/footer';

import Observable from './src/components/Observable';

import { navItems } from './src/data';

import { ThemeProvider } from './src/components/ThemeContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'primary-light'
    };
    this.onImagesIntersection = this.onImagesIntersection.bind(this);
    this.onSectionIntersection = this.onSectionIntersection.bind(this);
    this.onElementIntersection = this.onElementIntersection.bind(this);
  }

  componentDidMount() {
    this.LazyLoadImages();
  }

  onElementIntersection(entries, self) {
    entries.forEach(e => {
      const target = e.target;
      const animationClass = target.dataset.animation || null;
      if (e.isIntersecting) {
        target.classList.add(animationClass, 'animated');
      }
    });
  }

  onSectionIntersection(entries) {
    entries.forEach(e => {
      const theme = e.target.dataset.theme;
      if (e.isIntersecting) {
        this.setState({
          ...this.state,
          theme: theme
        });
      }
    });
  }

  onImagesIntersection(entries) {
    entries.forEach(e => {
      if (e.isIntersecting > 0 && e.target.dataset.src) {
        e.target.classList.add('fadeIn');
        e.target.src = e.target.dataset.src;
      }
    });
  }

  LazyLoadImages() {
    const config = {
      rootMargin: '60px',
      threshold: 0.5
    };

    let imgObserver = new IntersectionObserver(
      this.onImagesIntersection,
      config
    );
    const images = document.querySelectorAll('img');
    images.forEach(image => {
      imgObserver.observe(image);
    });
  }

  render() {
    const value = {
      ...this.state,
      animateElement: this.onElementIntersection
    };
    return (
      <ThemeProvider value={value}>
        <PageContainer>
          <Header>
            <Logo />
            <Navigation items={navItems} />
          </Header>
          <main className="index" role="main">
            <Observable
              element="section"
              id="intro"
              data-theme="primary-light"
              config={{ threshold: 0.4 }}
              className="main-section"
              callback={this.onSectionIntersection}
            >
              <Main />
            </Observable>
            <Observable
              element="section"
              data-theme="white"
              className="about-section"
              id="about"
              config={{ threshold: 0.2 }}
              callback={this.onSectionIntersection}
            >
              <About />
            </Observable>
            <Observable
              element="section"
              id="work"
              data-theme="secondary-light"
              config={{ threshold: 0.2 }}
              className="work-section container has-gutter-outside"
              callback={this.onSectionIntersection}
            >
              <Work />
            </Observable>
          </main>
          <Footer />
        </PageContainer>
      </ThemeProvider>
    );
  }
}

const page = document.getElementById('wrapper');

ReactDOM.render(<App />, page);

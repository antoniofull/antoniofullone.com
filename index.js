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
      lastUsedThemes: [],
      lastActiveAreas: []
    };
    this.onImagesIntersection = this.onImagesIntersection.bind(this);
    this.onSectionIntersection = this.onSectionIntersection.bind(this);
    this.onElementIntersection = this.onElementIntersection.bind(this);
    this.scrollToSection = this.scrollToSection.bind(this);
  }

  componentDidMount() {
    this.LazyLoadImages();
  }

  onSectionIntersection(entries) {
    entries.map(e => {
      const theme = e.target.dataset.theme;
      const id = e.target.getAttribute('id');
      if (e.isIntersecting) {
        this.setState({
          ...this.state,
          theme: theme,
          activeArea: id,
          lastActiveAreas: [...this.state.lastActiveAreas, id],
          lastUsedThemes: [...this.state.lastUsedThemes, theme]
        });
      } else {
        if (
          this.state.lastActiveAreas.length >= 0 &&
          id === this.state.activeArea
        ) {
          const lastUsedThemes = this.state.lastUsedThemes;
          const lastActiveAreas = this.state.lastActiveAreas;
          const themeIndex = lastUsedThemes.indexOf(theme) - 1;
          const areaIndex = lastActiveAreas.indexOf(id) - 1;
          this.setState({
            ...this.state,
            activeArea: lastActiveAreas[areaIndex],
            theme: lastUsedThemes[themeIndex]
          });
        }
      }
    });
  }

  onElementIntersection(entries) {
    entries.forEach(e => {
      const target = e.target;
      const animationClass = target.dataset.animation || null;
      if (e.isIntersecting) {
        target.classList.add(animationClass, 'animated');
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

  scrollToSection(e) {
    console.log(e.target);
    const target = e.target.getAttribute('href');
    const elementToScroll = document.querySelector(target);
    const isLocalLink = target.startsWith('#');
    if (isLocalLink && elementToScroll) {
      e.preventDefault();
      // Get Header height + some space
      const height = document.querySelector('.site-header').clientHeight + 30;
      // Get count where to scroll
      let count = elementToScroll.offsetTop - document.body.scrollTop - height;
      window.scrollTo({
        top: count,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  render() {
    let theme;
    switch (this.state.activeArea) {
      case 'about':
        theme = 'white';
        break;
      case 'work':
        theme = 'secondary-light';
        break;
      default:
        theme = 'primary-light';
    }
    const value = {
      ...this.state,
      activeTheme: theme,
      animateElement: this.onElementIntersection,
      scroll: this.scrollToSection
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
          <Observable
            element="footer"
            id="site-footer"
            data-theme="primary-light"
            config={{ threshold: 0.3 }}
            className="site-footer"
            callback={this.onSectionIntersection}
          >
            <Footer />
          </Observable>
        </PageContainer>
      </ThemeProvider>
    );
  }
}

const page = document.getElementById('wrapper');

ReactDOM.render(<App />, page);

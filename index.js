/* eslint-disable */
import smoothscroll from 'smoothscroll-polyfill';
import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import scrollToElement from 'scroll-to-element';

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
      lastActiveAreas: [],
      viewport: window.innerWidth,
      mailTooltip: false
    };
    this.onImagesIntersection = this.onImagesIntersection.bind(this);
    this.onSectionIntersection = this.onSectionIntersection.bind(this);
    this.onElementIntersection = this.onElementIntersection.bind(this);
    this.scrollToSection = this.scrollToSection.bind(this);
    this.onResize = this.onResize.bind(this);

    this.renderEmailMenu = this.renderEmailMenu.bind(this);
    this.toggleMobileLinks = this.toggleMobileLinks.bind(this);
    this.closeEmailLink = this.closeEmailLink.bind(this);
    this.copyEmailToClipboard = this.copyEmailToClipboard.bind(this);
    this.setEmailLink = this.setEmailLink.bind(this);
    // Smooth Scrolling polifyll for IOS and old browsers
    smoothscroll.polyfill();
  }

  componentDidMount() {
    this.LazyLoadImages();
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(this.onResize, 50);
    });
  }

  toggleMobileLinks() {
    this.setState({
      ...this.state,
      showMobileLinks: !this.state.showMobileLinks
    });
  }

  onResize() {
    this.setState({
      ...this.state,
      viewport: window.innerWidth
    });
  }

  onSectionIntersection(entries) {
    entries.map(e => {
      const theme = e.target.dataset.theme;
      const id = e.target.getAttribute('id');
      if (e.isIntersecting) {
        this.setState({
          ...this.state,
          mailMenu: false,
          theme: theme,
          activeArea: id,
          lastActiveAreas: [...this.state.lastActiveAreas, id],
          lastUsedThemes: [...this.state.lastUsedThemes, theme],
          showMobileLinks: id === '#about'
        });
      } else if (
        !e.isIntersecting &&
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
          theme: lastUsedThemes[themeIndex],
          showMobileLinks: id === '#about'
        });
      } else {
        this.setState({
          ...this.state,
          showMobileLinks: false
        });
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
      rootMargin: '40px',
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

  renderEmailMenu(e) {
    e.preventDefault();
    this.setState({
      mailMenu: !this.state.mailMenu
    });
  }

  copyEmailToClipboard() {
    const mail = 'hello@antoniofullone.com';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = mail;
    input.setAttribute('readonly', '');
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.select();
    if (document.execCommand('copy')) {
      this.setState({
        ...this.state,
        mailMessage: true,
        mailMenu: false
      });
    }
    window.setTimeout(() => {
      this.setState({
        ...this.state,
        mailMessage: false
      });
    }, 2500);
    document.body.removeChild(input);
  }

  closeEmailLink(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      mailMessage: false
    });
  }

  setEmailLink(e) {
    const mail = 'hello@antoniofullone.com';
    e.target.setAttribute('href', `mailto:${mail}`);
  }

  scrollToSection(e) {
    const target = e.target.getAttribute('href');
    const elementToScroll = document.querySelector(target);
    const isLocalLink = target.startsWith('#');

    if (isLocalLink && elementToScroll) {
      e.preventDefault();
      // Get Header height + some space
      const height =
        target === '#home'
          ? 0
          : document.querySelector('.site-header').clientHeight + 15;
      scrollToElement(elementToScroll, {
        offset: height * -1,
        ease: 'inBack',
        duration: 600
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
      case 'footer':
        theme = 'primary-light';
        break;
      default:
        theme = 'primary-light';
    }
    const value = {
      ...this.state,
      activeTheme: theme,
      animateElement: this.onElementIntersection,
      scroll: this.scrollToSection,
      toggleMobileLinks: this.toggleMobileLinks,
      toggleEmailMenu: this.renderEmailMenu,
      copyEmailToClipboard: this.copyEmailToClipboard,
      setEmailLink: this.setEmailLink
    };
    return (
      <ThemeProvider value={value}>
        <PageContainer>
          <Header>
            <Logo />
            <Navigation closeEmailLink={this.closeEmailLink} items={navItems} />
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

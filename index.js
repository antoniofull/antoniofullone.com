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
import { isFulfilled } from 'q';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.setBackground = this.setBackground.bind(this);

    // Create refs for elements
    this.introRef = React.createRef();
    this.aboutRef = React.createRef();
    this.workRef = React.createRef();
    this.footerRef = React.createRef();

    // Smooth Scrolling polifyll for IOS and old browsers
    smoothscroll.polyfill();
  }

  componentDidMount() {
    this.LazyLoadImages();
    this.resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(this.onResize, 0);
    });
    this.setBackground();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.setBackground);
    clearTimeout(this.resizeTimer);
  }

  setBackground(theme = 'primary-light') {
    this.setState({
      ...this.state,
      theme
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

  setBackgroundTheme(el) {
    const defaultValue = {
      theme: 'primary-light',
      area: 'intro'
    };
    const { theme, area } = window.pageYOffset > 400 ? el : defaultValue;
    if (theme && area) {
      this.setState({
        ...this.state,
        theme,
        area
      });
    }
  }

  onSectionIntersection(entries) {
    const visible = entries.filter(e => e.isIntersecting)[0];
  }

  onElementIntersection(entries) {
    const visible = entries.filter(entry => entry.isIntersecting)[0];
    if (visible) {
      const target = visible.target;
      const animationClass = target.dataset.animation || null;
      const theme = target.dataset.theme;
      if (theme) {
        this.setBackground(theme);
      }
      // Animate element when visible
      target.classList.add(animationClass, 'animated');
    }
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
      mailMenu: !this.state.mailMenu,
      showMobileLinks: false
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
    console.log(this.state);
    const value = {
      ...this.state,
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
          <Header theme={this.state.theme}>
            <Logo />
            <Navigation closeEmailLink={this.closeEmailLink} items={navItems} />
          </Header>
          <main className="index" role="main">
            <Observable
              element="section"
              id="intro"
              ref={this.introRef}
              config={{ threshold: 0.4 }}
              className="main-section"
              callback={this.onSectionIntersection}
            >
              <Main />
            </Observable>
            <Observable
              element="section"
              data-theme="white"
              data-area="about"
              ref={this.aboutRef}
              className="about-section"
              id="about"
              config={{ threshold: 0.3 }}
              callback={this.onSectionIntersection}
            >
              <About />
            </Observable>
            <Observable
              element="section"
              id="work"
              data-theme="secondary-light"
              data-area="work"
              ref={this.workRef}
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
            data-area="intro"
            ref={this.footerRef}
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

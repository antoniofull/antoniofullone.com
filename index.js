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
import { timingSafeEqual } from 'crypto';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: window.innerWidth,
      mailTooltip: false
    };
    this.onIntersection = this.onIntersection.bind(this);
    this.scrollToSection = this.scrollToSection.bind(this);
    this.onResize = this.onResize.bind(this);

    this.renderEmailMenu = this.renderEmailMenu.bind(this);
    this.toggleMobileLinks = this.toggleMobileLinks.bind(this);
    this.closeEmailLink = this.closeEmailLink.bind(this);
    this.copyEmailToClipboard = this.copyEmailToClipboard.bind(this);
    this.setEmailLink = this.setEmailLink.bind(this);
    this.setBackground = this.setBackground.bind(this);

    // Smooth Scrolling polifyll for IOS and old browsers
    smoothscroll.polyfill();
  }

  componentDidMount() {
    this.resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(this.onResize, 0);
    });
    this.setBackground();
    this.LazyLoadImages();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.resizeTimer);
  }

  setBackground(theme = 'primary-light') {
    this.setState({
      ...this.state,
      theme,
      showMobileLinks: theme !== 'white'
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

  onIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const src = target.dataset.src;
        const theme = target.dataset.theme;
        const animation = target.dataset.animation;
        if (animation) {
          this.setAnimation(target);
        }
        if (theme) {
          this.setBackground(theme);
        }
        if (src) {
          this.loadImage(entry.target);
        }
      }
    });
  }

  setAnimation(e) {
    if (!e) {
      return;
    }
    e.src = e.dataset.src;
    e.classList.add('animated', e.dataset.animation);
  }

  loadImage(e) {
    if (!e) {
      return;
    }
    e.classList.add('animated', 'fadeIn');
    e.src = e.dataset.src;
  }

  LazyLoadImages() {
    const config = {
      rootMargin: '0px',
      threshold: 0.4
    };

    let imgObserver = new IntersectionObserver(this.onIntersection, config);
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
    const isLocalLink = target.startsWith('#');

    if (isLocalLink) {
      const elementToScroll = document.querySelector(target);
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
    const value = {
      ...this.state,
      animateElement: this.onIntersection,
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
            <section element="section" id="intro" className="main-section">
              <Main />
            </section>
            <Observable
              element="section"
              data-theme="white"
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

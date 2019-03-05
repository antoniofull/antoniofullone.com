import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import scrollToElement from 'scroll-to-element';
import ReactGA from 'react-ga';
import { ThemeProvider } from '../components/ThemeContext';

import IndexLayout from '../layouts/IndexLayout';
import Observable from '../components/Observable';
import HomePageTemplate from '../templates/HomePageTemplate';
import Footer from '../components/footer/Footer';

import '../styles/variables.css';
import '../styles/reset.css';
import '../styles/animations.css';
import '../styles/typography.css';
import '../styles/grid.css';
import '../styles/helpers.css';
import '../styles/global.css';

if (typeof window !== 'undefined') {
  // Loading the polify for Intersection Observer
  require('intersection-observer');
}

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: (typeof window !== `undefined` && window.innerWidth) || 0,
      mailTooltip: false,
      isLoading: true
    };

    // Observables Components
    this.onIntersection = this.onIntersection.bind(this);
    this.scrollToSection = this.scrollToSection.bind(this);
    // Calculate Viewport
    this.onResize = this.onResize.bind(this);

    // Navigation Actions
    this.renderEmailMenu = this.renderEmailMenu.bind(this);
    this.toggleMobileLinks = this.toggleMobileLinks.bind(this);
    this.closeEmailLink = this.closeEmailLink.bind(this);
    this.copyEmailToClipboard = this.copyEmailToClipboard.bind(this);
    this.setEmailLink = this.setEmailLink.bind(this);
    // Home Page background Theming
    this.setBackground = this.setBackground.bind(this);
    this.allFontsLoaded = this.allFontsLoaded.bind(this);

    // get a reference to DOM elements

    this.vespaRef = React.createRef();
  }

  componentDidMount() {
    // Window will be undefined if loaded before componendDidMount
    try {
      this.WebFont = require('webfontloader');
    } catch (e) {
      console.error(e);
    }

    ReactGA.initialize('UA-67184030-4');
    ReactGA.pageview(window.location.pathname + window.location.search);

    this.resizeTimer;
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(this.onResize, 0);
      });
    }
    this.setBackground();
    this.LazyLoadImages();

    const smoothscroll = require('smoothscroll-polyfill');
    // Smooth Scrolling polifyll for IOS and old browsers
    smoothscroll.polyfill();

    const WebFontConfig = {
      typekit: { id: 'avo5hes' },
      custom: {
        families: ['Bodoni 24'],
        urls: ['https://indestructibletype.com/fonts/Bodoni/Bodoni.css']
      },
      active: this.allFontsLoaded
    };

    this.WebFont.load(WebFontConfig);
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
    clearTimeout(this.resizeTimer);
  }

  allFontsLoaded() {
    this.setState({
      ...this.state,
      isLoading: false
    });
  }

  setBackground(theme = 'primary-light') {
    if (!this.props.location.pathname.includes('/blog/')) {
      this.setState({
        ...this.state,
        theme,
        showMobileLinks: theme !== 'white'
      });
    }
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
      viewport:
        typeof window != `undefined` ? window.innerWidth : this.state.viewport
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
    const isLocalLink = target.includes('#');

    if (isLocalLink) {
      const elementToScroll = document.querySelector(target);
      e.preventDefault();
      // Get Header height + some space
      const height =
        target === '#home'
          ? 0
          : document.querySelector('.site-header').clientHeight;
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
      setEmailLink: this.setEmailLink,
      closeEmailLink: this.closeEmailLink,
      path: this.props.location.pathname
    };
    return (
      <ThemeProvider value={value}>
        <IndexLayout>
          <HomePageTemplate />
          <StaticQuery
            query={graphql`
              query SiteTitleQuery {
                site {
                  siteMetadata {
                    title
                    description
                  }
                }
              }
            `}
            render={data => (
              <Helmet>
                <link
                  rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
                  integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
                  crossorigin="anonymous"
                />

                <title>{data.site.siteMetadata.title}</title>
                <meta
                  name="description"
                  content={data.site.siteMetadata.description}
                />
              </Helmet>
            )}
          />

          <Observable
            element="footer"
            id="site-footer"
            config={{ threshold: 0.3 }}
            className="site-footer"
            callback={this.onIntersection}
          >
            <Footer />
          </Observable>
        </IndexLayout>
      </ThemeProvider>
    );
  }
}

export default Index;

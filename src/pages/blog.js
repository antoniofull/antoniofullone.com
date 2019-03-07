import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import ReactGA from 'react-ga';

import { ThemeProvider } from '../components/ThemeContext';
import Observable from '../components/Observable';
import Footer from '../components/footer/Footer';

import BlogLayout from '../layouts/BlogLayout';
import BlogHomeTemplate from '../templates/BlogHomeTemplate';

if (typeof window !== 'undefined') {
  // Loading the polify for Intersection Observer
  require('intersection-observer');
}

class BlogHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: typeof window !== `undefined` && window.innerWidth,
      mailTooltip: false
    };
    this.onIntersection = this.onIntersection.bind(this);
    this.onResize = this.onResize.bind(this);

    this.renderEmailMenu = this.renderEmailMenu.bind(this);
    this.closeEmailLink = this.closeEmailLink.bind(this);
    this.copyEmailToClipboard = this.copyEmailToClipboard.bind(this);
    this.setEmailLink = this.setEmailLink.bind(this);
  }

  componentDidMount() {
    // Loading the polify for Intersection Observer
    // Window will be undefined if loaded before componendDidMount
    try {
      this.WebFont = require('webfontloader');
    } catch (e) {
      console.error(e);
    }
    ReactGA.initialize('UA-67184030-4');
    ReactGA.pageview(window.location.pathname + window.location.search);

    const WebFontConfig = {
      typekit: { id: 'avo5hes' },
      custom: {
        families: ['Bodoni 24'],
        urls: ['https://indestructibletype.com/fonts/Bodoni/Bodoni.css']
      },
      active: this.allFontsLoaded
    };
    this.WebFont.load(WebFontConfig);

    this.resizeTimer;
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(this.onResize, 0);
      });
    }
    this.LazyLoadImages();

    const smoothscroll = require('smoothscroll-polyfill');
    // Smooth Scrolling polifyll for IOS and old browsers
    smoothscroll.polyfill();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.resizeTimer);
  }

  onResize() {
    this.setState({
      ...this.state,
      viewport: typeof window !== `undefined` && window.innerWidth
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
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        this.setState({
          ...this.state,
          mailMessage: false
        });
      }, 2500);
    }
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

  render() {
    const value = {
      ...this.state,
      animateElement: this.onIntersection,
      toggleEmailMenu: this.renderEmailMenu,
      copyEmailToClipboard: this.copyEmailToClipboard,
      setEmailLink: this.setEmailLink
    };
    return (
      <ThemeProvider value={value}>
        {/* Not a proper solution but for the moment is ok */}
        <Helmet>
          <title>Antonio Fullone Personal Blog</title>
          <meta
            name="description"
            content="Antonio Fullone Personal blog. Web and self development"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
            integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
            crossorigin="anonymous"
          />
          <script
            crossorigin="anonymous"
            src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=default%2CIntersectionObserver%2CIntersectionObserverEntry"
          />
        </Helmet>
        <StaticQuery
          query={graphql`
            query allPostData {
              allMarkdownRemark(
                filter: { frontmatter: { status: { ne: "draft" } } }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
              ) {
                edges {
                  node {
                    id
                    html
                    excerpt(pruneLength: 140)
                    frontmatter {
                      status
                      path
                      title
                      image
                      imageDesc
                      date
                      introduction
                    }
                  }
                }
              }
            }
          `}
          render={data => (
            <BlogLayout>
              <BlogHomeTemplate posts={data.allMarkdownRemark.edges} />
              <Observable
                element="footer"
                id="site-footer"
                data-theme="primary-light"
                config={{ threshold: 0.3 }}
                className="site-footer"
                callback={this.onIntersection}
              >
                <Footer />
              </Observable>
            </BlogLayout>
          )}
        />
      </ThemeProvider>
    );
  }
}

export default BlogHome;

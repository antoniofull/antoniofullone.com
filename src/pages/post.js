import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Prism from 'prismjs';
import ReactGA from 'react-ga';

import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-okaidia.css';

import Header from '../components/Header';
import Logo from '../components/Logo';
import Navigation from '../components/navigation/MainNav';
import Observable from '../components/Observable';
import Footer from '../components/footer/Footer';
import PostLayout from '../layouts/Postlayout';
import PageContainer from '../components/PageContainer';
import { ThemeProvider } from '../components/ThemeContext';
import { navItems } from '../data';

import '../styles/post.css';

if (typeof window !== 'undefined') {
  // Loading the polify for Intersection Observer
  require('intersection-observer');
}

class Post extends Component {
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
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
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
    const { post } = this.props.data;
    const { next, prev } = this.props.pageContext;
    const { related } = this.props.data;

    return (
      <ThemeProvider value={value}>
        {/* Not a proper solution but for the moment is ok */}
        <Helmet>
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
        <PageContainer>
          <Header>
            <Logo />
            <Navigation closeEmailLink={this.closeEmailLink} items={navItems} />
          </Header>
          <PostLayout post={post} prev={prev} next={next} />
        </PageContainer>
        <Observable
          element="footer"
          id="site-footer"
          config={{ threshold: 0.3 }}
          className="site-footer"
          callback={this.onIntersection}
        >
          <Footer />
        </Observable>
      </ThemeProvider>
    );
  }
}

export const query = graphql`
  query post($path: String!, $category: String, $postId: String) {
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      excerpt(pruneLength: 20)
      frontmatter {
        path
        title
        date(formatString: "MMMM DD, YYYY")
        image
        imageDesc
        category
      }
    }

    related: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category, ne: $postId } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
    ) {
      edges {
        node {
          excerpt(pruneLength: 20)
          id
          html
          frontmatter {
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
`;

export default Post;

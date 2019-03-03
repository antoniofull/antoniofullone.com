require('intersection-observer');

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import striptags from 'striptags';
import Prism from 'prismjs';

import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-okaidia.css';

import Header from '../components/Header';
import Logo from '../components/Logo';
import Navigation from '../components/navigation/MainNav';
import Observable from '../components/Observable';
import Footer from '../components/footer/Footer';
import PageContainer from '../components/PageContainer';
import { ThemeProvider } from '../components/ThemeContext';
import { navItems } from '../data';

import '../styles/post.css';

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

    let readingTime =
      striptags(post.html)
        .trim()
        .split(/\s+/).length / 200;
    readingTime = Math.floor(readingTime);

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
          <link
            rel="stylesheet"
            href="https://indestructibletype.com/fonts/Bodoni/Bodoni.css"
            type="text/css"
            charset="utf-8"
          />
        </Helmet>
        <PageContainer>
          <Header>
            <Logo />
            <Navigation closeEmailLink={this.closeEmailLink} items={navItems} />
          </Header>
          <article className="post single container has-gutter-outside">
            <header>
              <h1 className="post__title">{post.frontmatter.title}</h1>
              <div className="post__meta freight-sans">
                <time
                  className="post__date"
                  dateTime={new Date(post.frontmatter.date).toLocaleString(
                    'en-US',
                    {
                      timeZone: 'UTC'
                    }
                  )}
                >
                  {new Date(post.frontmatter.date).toLocaleString('en-US', {
                    timeZone: 'UTC'
                  })}{' '}
                </time>
                <span className="reading-time">
                  {' '}
                  - Reading Time: {readingTime} minutes
                </span>
              </div>
            </header>
            {post.frontmatter.image && (
              <picture className="main-image">
                <img
                  className="post-image"
                  src={post.frontmatter.image}
                  alt={post.frontmatter.imageDesc}
                />
                <figcaption className="freight-sans--light">
                  {post.frontmatter.imageDesc}
                </figcaption>
              </picture>
            )}

            <div
              className="post__content has-gutter-outside"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
          <section className="follow-links container margin-y-l">
            <ul className="next-previous">
              {next && (
                <li className="next">
                  <Link className="prev-post" to={prev.frontmatter.path}>
                    {next.frontmatter.title}
                  </Link>
                </li>
              )}
              {prev && (
                <li className="prev">
                  <Link className="next-post" to={next.frontmatter.path}>
                    {prev.frontmatter.title}
                  </Link>
                </li>
              )}
            </ul>
          </section>
          {/* <section className="related-posts container has-gutter-outside freight-sans">
            <h2 className="related-posts__title">Related Posts: </h2>
            {related.edges.map(post => (
              <Link to={post.node.frontmatter.path}>
                <article className="post--related" key={post.node.id}>
                  <header>
                    <h3>{post.node.frontmatter.title}</h3>
                  </header>
                  {post.node.frontmatter.image && (
                    <img src={post.node.frontmatter.image} />
                  )}
                  <p className="post-excerpt">{post.node.excerpt}</p>
                </article>
              </Link>
            ))}
          </section> */}
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
          excerpt(pruneLength: 60)
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

/* eslint-disable */
import 'intersection-observer';
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

import { navItems } from './src/data';

import { ThemeProvider } from './src/components/ThemeContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'primary-light',
      area: 'intro'
    };
    this.onImagesIntersection = this.onImagesIntersection.bind(this);
    this.onAboutIntersection = this.onAboutIntersection.bind(this);
    this.onIntroIntersection = this.onIntroIntersection.bind(this);

    this.onIntersection = this.onIntersection.bind(this);
  }

  componentDidMount() {
    this.LazyLoadImages();
    // this.loadAboutSection();
    // this.observeItro();

    this.observeSections();
  }

  onIntersection(entries) {
    entries.forEach(e => {
      const area = e.target.dataset.area;
      if (e.isIntersecting && area === 'intro') {
        this.setState({
          theme: 'primary-light'
        });
      }
      if (e.isIntersecting && area === 'about') {
        this.setState({
          theme: 'white'
        });
      }
      if (e.isIntersecting && area === 'work') {
        this.setState({
          theme: 'secondary-light'
        });
      }
    });
  }

  observeSections() {
    const config = {
      rootMargin: '30px',
      threshold: 0.4
    };
    const elements = document.querySelectorAll('[data-area]');
    const observer = new IntersectionObserver(this.onIntersection, config);
    elements.forEach(el => {
      observer.observe(el);
    });
  }

  onIntroIntersection(entries) {
    if (entries[0].isIntersecting) {
      this.setState({ theme: 'primary-light', activeElement: 'intro' });
    }
  }

  observeItro() {
    const config = {
      rootMargin: '30px',
      threshold: 1
    };
    const e = document.querySelector('.illustration__container');
    let o = new IntersectionObserver(this.onIntroIntersection, config);
    o.observe(e);
  }

  onAboutIntersection(entries) {
    if (entries[0].isIntersecting) {
      this.setState({ theme: 'white', activeElement: 'about' });
    }
    entries.forEach((e, i) => {
      let n = i;
      const className = e.target.dataset.animation;
      const target = e.target;
      if (e.isIntersecting) {
        window.setTimeout(() => {
          target.classList.remove('no-opacity');
          target.classList.add(className);
        }, 300 * n);
      }
    });
  }

  loadAboutSection() {
    const config = {
      rootMargin: '0px',
      threshold: 0.2
    };

    let aboutObserver = new IntersectionObserver(
      this.onAboutIntersection,
      config
    );

    const elements = [...document.querySelectorAll('.about .js-animatable')];
    elements.forEach(el => {
      el.classList.add('no-opacity');
      aboutObserver.observe(el);
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
    return (
      <ThemeProvider value={this.state}>
        <PageContainer>
          <Header>
            <Logo />
            <Navigation items={navItems} />
          </Header>
          <main className="index" role="main">
            <Main />
            <About />
            <Work />
          </main>
          <Footer />
        </PageContainer>
      </ThemeProvider>
    );
  }
}

const page = document.getElementById('wrapper');

ReactDOM.render(<App />, page);

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
      element: {
        isEntering: 0,
        name: ''
      }
    };
    this.onImagesIntersection = this.onImagesIntersection.bind(this);
    this.onAboutIntersection = this.onAboutIntersection.bind(this);
  }

  componentDidMount() {
    this.LazyLoadImages();
    this.loadAboutSection();
  }

  onAboutIntersection(entries) {
    const el = this.state.element;
    entries.forEach((e, i) => {
      let n = i;
      const className = e.target.dataset.animation;
      const target = e.target;
      if (e.isIntersecting) {
        window.setTimeout(() => {
          target.classList.remove('no-opacity');
          target.classList.add(className);
        }, 500 * n);
      }

      if (i < 1 && e.isIntersecting) {
        this.setState({
          theme: 'white',
          element: {
            name: 'about',
            isEntering: 1
          }
        });
      } else {
        this.setState({
          theme: 'primary-light',
          element: {
            name: '',
            isEntering: 0
          }
        });
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
      if (e.intersectionRect.bottom > 0) {
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

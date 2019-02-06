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
      visibleElement: null
    };
    this.onImagesIntersection = this.onImagesIntersection.bind(this);
    this.onAboutIntersection = this.onAboutIntersection.bind(this);
  }

  componentDidMount() {
    this.LazyLoadImages();
    this.loadAboutSection();
  }

  onAboutIntersection(entries) {
    entries.forEach(e => {
      if (e.isIntersecting && this.state.visibleElement !== 'about') {
        const target = e.target.dataset.animation;
        this.setState({
          theme: 'white',
          visibleElement: target
        });
      } else {
        this.setState({
          theme: 'primary-light'
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
    const about = document.querySelector('.about__content');
    aboutObserver.observe(about);
    console.log(document.querySelector('.about__img').clientHeight);
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

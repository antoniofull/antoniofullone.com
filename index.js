/* eslint-disable */
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

import Observable from './src/components/Observable';

import { navItems } from './src/data';

import { ThemeProvider } from './src/components/ThemeContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'primary-light',
      area: 'intro',
      newArea: 'intro'
    };
    this.onImagesIntersection = this.onImagesIntersection.bind(this);
    this.onIntersection = this.onIntersection.bind(this);
  }

  componentDidMount() {
    this.LazyLoadImages();
  }

  onIntersection(entries) {
    const a = {
      intro: {
        bg: 'primary-light'
      },
      about: {
        bg: 'white'
      },
      work: {
        bg: 'secondary-light'
      }
    };
    entries.forEach(e => {
      if (e.isIntersecting) {
        this.setState({
          ...this.state,
          newArea: e.target.dataset.area
        });
      }
      const area = e.target.dataset.area;
      if (area === this.state.area && !e.isIntersecting) {
        const newArea = this.state.newArea;

        this.setState({
          ...this.state,
          theme: newArea ? a[newArea].bg : this.state.theme,
          area: this.state.newArea
        });
        const target = document.querySelector(`[data-area="${newArea}"]`);
        target.querySelectorAll('.js-animatable').forEach((t, i) => {
          const className = t.dataset.animation || null;
          let n = i;
          window.setTimeout(() => {
            t.classList.remove('no-opacity');
            t.classList.add(className);
          }, 300 * n);
        });
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
            <Observable
              element="section"
              id="intro"
              data-area="intro"
              className="main-section"
              callBack={this.onIntersection}
            >
              <Main />
            </Observable>
            <Observable
              element="section"
              data-area="about"
              className="about-section"
              id="about"
              callBack={this.onIntersection}
            >
              <About />
            </Observable>
            <Observable
              element="section"
              id="work"
              data-area="work"
              className="work-section container has-gutter-outside"
              callBack={this.onIntersection}
            >
              <Work />
            </Observable>
          </main>
          <Footer />
        </PageContainer>
      </ThemeProvider>
    );
  }
}

const page = document.getElementById('wrapper');

ReactDOM.render(<App />, page);

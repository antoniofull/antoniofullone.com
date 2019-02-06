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

import { navItems } from './src/data';

import { ThemeProvider } from './src/components/ThemeContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'primary-light',
      visibleElement: false
    };
    this.onIntersection = this.onIntersection.bind(this);
    this.aboutRef = React.createRef();
  }

  componentDidMount() {
    this.observeElements();
  }
  onIntersection(entries) {
    const e = entries[0];
    let d = entries[0].boundingClientRect.bottom;
    if (entries[0].isIntersecting) {
      this.setState({
        theme: this.state.theme === 'primary-light' ? 'white' : 'primary-light',
        visibleElement: !this.state.visibleElement
      });
      console.log(this.state, d);
    }
  }

  observeElements() {
    const config = {
      rootMargin: '0px',
      threshold: 1
    };

    let observer = new IntersectionObserver(this.onIntersection, config);
    observer.observe(document.querySelector('.about__img'));
  }

  render() {
    console.log(this.state);
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

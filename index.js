/* eslint-disable */
import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
// import PropTypes from 'prop-types'

import Header from './src/components/header';
import Logo from './src/components/logo';
import Navigation from './src/components/navigation';
import Main from './src/components/main';
import About from './src/components/about';
import Work from './src/components/work';
import Footer from './src/components/footer';

import { navItems } from './src/data';

class App extends Component {
  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

const page = document.getElementById('page');

ReactDOM.render(<App />, page);

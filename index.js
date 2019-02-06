/* eslint-disable */
import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

import Header from './src/components/header';
import Logo from './src/components/logo';
import Navigation from './src/components/navigation';
import Main from './src/components/main';
import About from './src/components/about';
import Work from './src/components/work';
import Footer from './src/components/footer';

import { navItems } from './src/data';

const PageContainer = styled.div`
  background-color: ${props => props.theme.primary};
`;

class App extends Component {
  render() {
    return (
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
    );
  }
}

const page = document.getElementById('page');

ReactDOM.render(<App />, page);

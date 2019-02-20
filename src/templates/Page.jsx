import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import PageContainer from '../components/PageContainer';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Navigation from '../components/navigation/MainNav';
import Main from '../components/main';
import About from '../components/about';
import Work from '../components/work';
import Footer from '../components/footer';
const Page = ({}) => (
  <React.Fragment>
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
      <script src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=default%2CIntersectionObserver%2CIntersectionObserverEntry" />
    </Helmet>
    <PageContainer>
      <Header>
        <Logo />
        <Navigation closeEmailLink={this.closeEmailLink} items={navItems} />
      </Header>
      <main className="index" role="main">
        <section element="section" id="intro" className="main-section">
          <Main />
        </section>
        <Observable
          element="section"
          data-theme="white"
          ref={this.aboutRef}
          className="about-section"
          id="about"
          config={{ threshold: 0.3 }}
          callback={this.onSectionIntersection}
        >
          <About />
        </Observable>
        <Observable
          element="section"
          id="work"
          data-theme="secondary-light"
          ref={this.workRef}
          config={{ threshold: 0.2 }}
          className="work-section container has-gutter-outside"
          callback={this.onSectionIntersection}
        >
          <Work />
        </Observable>
      </main>
      <Observable
        element="footer"
        id="site-footer"
        data-theme="primary-light"
        ref={this.footerRef}
        config={{ threshold: 0.3 }}
        className="site-footer"
        callback={this.onSectionIntersection}
      >
        <Footer />
      </Observable>
    </PageContainer>
  </React.Fragment>
);

export default Page;

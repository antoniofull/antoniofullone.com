import React from 'react';

import { socialData } from '../../data';

import FooterTitle from './FooterTitle';
import BlogPosts from './BlogPosts';
import Address from './Address';
import ReadingList from './reading/Reading';
import Credits from './credits/Credits';
import Social from '../social/Social';
import FooterTagline from './FooterTagline';
import SubFooter from './SubFooter';
import Logo from '../logo';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-wrapper">
      <div className="container footer-container grid grid-large-rowgap">
        <FooterTitle />
        <BlogPosts />
        <Credits />
        <ReadingList />
        <Address />
        <Logo />
        <section className="social social--footer">
          <Social data={socialData} />
        </section>
        <FooterTagline />
      </div>
      <SubFooter />
    </div>
  </footer>
);

export default Footer;

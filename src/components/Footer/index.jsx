import React from 'react';

import FooterTitle from './FooterTitle';
import BlogPosts from './BlogPosts';
import Address from './Address';
import ReadingList from './ReadingList';
import GeekStuff from './GeekStuff';
import Social from './Social';
import FooterTagline from './FooterTagline';
import SubFooter from './SubFooter';
import Logo from '../Logo';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-container padding-x-half">
      <FooterTitle />
      <BlogPosts />
      <GeekStuff />
      <ReadingList />
      <Social />
      <Address />
      <Logo />
      <FooterTagline />
    </div>
    <SubFooter />
  </footer>
);

export default Footer;

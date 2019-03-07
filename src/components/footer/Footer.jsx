import React from 'react';
import ReactMarkdown from 'react-markdown';

import { socialData, addressData } from '../../data';

import FooterTitle from './FooterTitle';
import BlogPosts from './BlogPosts';
import ReadingList from './reading/Reading';
import Credits from './credits/Credits';
import Social from '../social';
import FooterTagline from './FooterTagline';
import SubFooter from './SubFooter';
import Logo from '../Logo';

// CSS
import '../../styles/footer.css';

const Footer = () => (
  <div className="footer-wrapper">
    <div className="container footer-container grid grid-large-rowgap">
      <FooterTitle />
      <BlogPosts />
      <Credits />
      <ReadingList />
      <address className="info-address">
        <h3 className="footer-header text-white">Antonio Fullone</h3>
        <ReactMarkdown source={addressData} />
      </address>
      <Logo />
      <section className="social social--footer">
        <Social data={socialData} />
      </section>
      <FooterTagline />
    </div>
    <SubFooter />
  </div>
);

export default Footer;

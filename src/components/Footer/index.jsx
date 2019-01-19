import React from 'react';

import FooterTitle from './FooterTitle';
import BlogPosts from './BlogPosts';
import Address from './Address';
import ReadingList from './ReadingList';
import GeekStuff from './GeekStuff';
import Social from './Social';
import FooterTagline from './FooterTagline';
import SubFooter from './SubFooter';

const Footer = props => (
    <footer>
        <FooterTitle />
        <BlogPosts />
        <GeekStuff />
        <ReadingList />
        <Social />
        <Address />
        <FooterTagline />
        <SubFooter />
    </footer>
);

export default Footer;
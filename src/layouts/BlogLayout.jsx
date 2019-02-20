import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { ThemeConsumer } from '../components/ThemeContext';

import Header from '../components/Header';
import Logo from '../components/Logo';
import MainNav from '../components/navigation/MainNav';
import PageContainer from '../components/PageContainer';
import { navItems } from '../data';

const BlogLayout = ({ children, posts }) => (
  <ThemeConsumer>
    {({ closeEmailLink }) => (
      <PageContainer>
        <Header>
          <Logo />
          <MainNav items={navItems} closeEmailLink={closeEmailLink} />
        </Header>
        {children}
      </PageContainer>
    )}
  </ThemeConsumer>
);

BlogLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default BlogLayout;

import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Logo from '../components/Logo';
import MainNav from '../components/navigation/MainNav';
import PageContainer from '../components/PageContainer';
import { navItems } from '../data';

const IndexLayout = ({ children }) => (
  <PageContainer>
    <Header>
      <Logo />
      <MainNav items={navItems} />
    </Header>
    {children}
  </PageContainer>
);

IndexLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default IndexLayout;

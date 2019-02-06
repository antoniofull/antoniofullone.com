import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ThemeConsumer } from './ThemeContext';

// Page container is a styled components
// So I can reuse theming
const Container = styled.div`
  background-color: ${props => props.theme && `var(--color-${props.theme})`};
`;

const PageContainer = ({ children }) => (
  <ThemeConsumer>
    {({ theme }) => (
      <Container theme={theme} className="page">
        {children}
      </Container>
    )}
  </ThemeConsumer>
);

PageContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageContainer;

import React from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem';
import Message from '../Message';
import { ThemeConsumer } from '../ThemeContext';

const MainNav = ({ items, closeEmailLink }) => (
  <ThemeConsumer>
    {({ mailMessage }) => (
      <nav
        className="site-nav freight-sans"
        role="navigation"
        aria-label="Main Site Navigation"
      >
        <ul className="nav-list">
          {items && items.map(item => <NavItem key={item.id} item={item} />)}
        </ul>
        {mailMessage ? (
          <Message visible={mailMessage}>
            <i className="far fa-check-circle" />
            <i
              className="fas fa-times close-icon"
              role="link"
              tabIndex={0}
              onKeyUp={closeEmailLink}
              onClick={closeEmailLink}
            />
            Email copied to clipboard
          </Message>
        ) : null}
      </nav>
    )}
  </ThemeConsumer>
);

MainNav.propTypes = {
  closeEmailLink: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default MainNav;

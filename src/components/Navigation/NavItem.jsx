import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import { ThemeConsumer } from '../ThemeContext';

const NavIListItem = styled.li`
  width: auto;
  text-transform: uppercase;
  font-size: 0.667rem;
  margin-left: var(--grid-column-gutter);
  position: relative;
`;

const NavLink = styled.a`
  font-weight: 600;
  color: ${props =>
    props.active ? 'var(--color-accent)' : 'var(--color-black-dark)'};
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    color: ${props =>
      props.active ? 'var(--color-accent)' : 'var(--color-black-dark)'};
  }
  &:hover:active {
    color: ${props =>
      props.active ? 'var(--color-accent)' : 'var(--color-black-dark)'};
  }
  &:visited,
  &:active {
    color: ${props =>
      props.active ? 'var(--color-accent)' : 'var(--color-black-dark)'};
  }
`;

const ContactNav = styled.ul`
  position: absolute;
  top: 100%;
  min-width: 180px;
  padding: 8px 16px;
  font-size: 12px;
  border-width: 1px;
  border-style: solid;
  ${props =>
    props.viewport > 1200
      ? `left: 50%;
    transform: translateX(-50%);`
      : `right: 0;`}
  border-radius: 8px;
  ${props => {
    switch (props.theme) {
      case 'white':
        return 'background-color: #FBFBFA; border-color: #EFEFE6';
      case 'secondary-light':
        return 'background-color: #BCC4E0; border-color: #A2ACD4';
      default:
        return 'background-color: #EFEFE7; border-color: #E9E9DC';
    }
  }};
`;

const ContactNavLink = styled.a`
  color: var(--color-black-dark);
  text-decoration: none;
  transition: all 0.2s ease-in;
  &:hover,
  &:active {
    color: var(--color-accent);
  }
`;

const NavItem = ({ item }) => (
  <ThemeConsumer>
    {({
      scroll,
      theme,
      toggleEmailMenu,
      mailMenu,
      copyEmailToClipboard,
      setEmailLink,
      viewport
    }) => (
      <NavIListItem className="nav-list__item">
        <NavLink
          theme={theme}
          link={item.link.replace('#', '')}
          href={item.link}
          active={
            (item.link === '#about' && theme === 'white') ||
            (item.link === '#work' && theme === 'secondary-light')
          }
          className={item.link.startsWith('mailto') && 'js-contacts'}
          onClick={item.link === '#contacts' ? toggleEmailMenu : scroll}
        >
          {item.text}
        </NavLink>
        {item.link === '#contacts' && mailMenu && (
          <ContactNav
            theme={theme}
            viewport={viewport}
            className={classNames('contact-nav', { active: mailMenu })}
          >
            <li>
              <ContactNavLink
                href="#copy-to-clipboard"
                onClick={copyEmailToClipboard}
              >
                Copy email to clipboard
              </ContactNavLink>
            </li>
            <li>
              <ContactNavLink onClick={setEmailLink} href="mailto:void">
                Open in your email client
              </ContactNavLink>
            </li>
          </ContactNav>
        )}
      </NavIListItem>
    )}
  </ThemeConsumer>
);

NavItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired
};
export default NavItem;

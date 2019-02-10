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
  a {
    color: ${props => {
      return props.area === props.link
        ? 'var(--color-accent)'
        : 'var(--color-black-dark)';
    }};
  }
`;

const NavLink = styled.a`
  font-weight: 600;
  color: var(--color-black-dark);
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: var(--color-accent);
    text-decoration: none;
  }
`;

const NavItem = ({ item }) => (
  <ThemeConsumer>
    {({ scroll, activeArea }) => (
      <NavIListItem
        area={activeArea}
        link={item.link.replace('#', '')}
        className="nav-list__item"
      >
        <NavLink href={item.link} onClick={scroll}>
          {item.text}
        </NavLink>
      </NavIListItem>
    )}
  </ThemeConsumer>
);

NavItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired
};
export default NavItem;

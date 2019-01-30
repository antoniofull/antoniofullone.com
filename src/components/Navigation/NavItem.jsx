import React from 'react';

const NavItem = ({ item }) => (
    <li className='nav-list__item'>
        <a className='nav-list__link' href={item.link}>{item.text}</a>
    </li>
)

export default NavItem;

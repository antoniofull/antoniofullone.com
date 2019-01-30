import React from 'react'

import NavItem from './NavItem';

const Navigation = ({ items }) => (
    <nav className='site-nav freight-sans' role='navigation' aria-label='Main Site Navigation'>
        <ul className='nav-list'>
            {items && items.map(item => (
                <NavItem key={item.id} item={item} />
            ))}
        </ul>
    </nav>
);

export default Navigation;
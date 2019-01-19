import React from 'react'

import {navItems} from '../../data';

const Navigation = props => (
    <nav className=''>
        <ul>
            {navItems && navItems.map(navItem => (
                <li className='' key={navItem.id}>
                    {navItem.text}
                </li>
            ))}
        </ul>
    </nav>
);

export default Navigation;
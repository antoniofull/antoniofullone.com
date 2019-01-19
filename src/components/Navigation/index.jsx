import React from 'react'

import * as data from '../../data';

const Navigation = props => (
    <nav className=''>
        <ul>
            {data.navigation.map(navItem => (
                <li className='' key={navItem.id}>
                    {navItem.text}
                </li>
            ))}
        </ul>
    </nav>
);

export default Navigation;
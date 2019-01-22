import React from 'react'

const Header = props => (
    <header className='site-header' role='banner'>
        {props.children}
    </header>
);

export default Header;
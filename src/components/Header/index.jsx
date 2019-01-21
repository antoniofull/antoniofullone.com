import React from 'react'

const Header = props => (
    <header className='site-header padding-x-half' role='banner'>
        {props.children}
    </header>
);

export default Header;
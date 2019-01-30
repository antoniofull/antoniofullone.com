import React from 'react'

const Header = props => (
    <header className='site-header bg-white has-shadows' role='banner'>
        <div className="container container--grid grid-col-4 grid-align-center">
            {props.children}
        </div>
    </header>
);

export default Header;
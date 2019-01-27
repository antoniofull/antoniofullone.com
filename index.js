import React, { Component } from 'react'
import * as ReactDOM from 'react-dom';
// import PropTypes from 'prop-types'

import Header from './src/components/Header';
import Logo from './src/components/Logo';
import Navigation from './src/components/Navigation';
import Main from './src/components/Main';
import About from './src/components/About';
import Work from './src/components/Work';
import Footer from './src/components/Footer';

import {navItems} from './src/data';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Header>
                    <Logo />    
                    <Navigation items={navItems} />
                </Header>
                <main className='index' role='main'>
                    <Main />
                    <About />
                    <Work />
                </main>
                <Footer />
            </React.Fragment>    
        )
    }
}

let page = document.getElementById('page');

ReactDOM.render(<App />, page);
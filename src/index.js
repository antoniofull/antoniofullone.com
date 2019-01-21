import React, { Component } from 'react'
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import Header from './components/Header';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import Main from './components/Main';
import About from './components/About';
import Work from './components/Work';
import Footer from './components/Footer';

import {navItems} from './data';

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
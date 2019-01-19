import React, { Component } from 'react'
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import Header from './components/Header';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import Main from './components/Main';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Header>
                    <Logo />    
                    <Navigation />
                </Header>
                <main>
                    <Main />
                </main>
            </React.Fragment>    
        )
    }
}

let page = document.getElementById('page');

ReactDOM.render(<App />, page);
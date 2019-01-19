import React, { Component } from 'react'
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import Header from './components/Header';
import Logo from './components/Logo';
import Navigation from './components/Navigation';

class App extends Component {
    render() {
        return (
            <Header>
                <Logo />    
            </Header>
        )
    }
}

let page = document.getElementById('page');

ReactDOM.render(<App />, page);
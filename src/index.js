import React, { Component } from 'react'
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import Hello from './components/Hello';

class HelloWorld extends Component {
    render() {
        return (
            <div>
                <Hello name="Antonio" />
            </div>
        )
    }
}

let page = document.getElementById('page');

ReactDOM.render(<HelloWorld />, page);
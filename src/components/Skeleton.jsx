import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/skeleton.css';

class Skeleton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  render() {
    return <div className="skeleton" />;
  }
}

export default Skeleton;

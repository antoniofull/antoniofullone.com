import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Observable extends Component {
  constructor(props) {
    super(props);
    // Create a reference to the element
    this.ref = React.createRef();
    this.observeElement = this.observeElement.bind(this);
  }

  componentDidMount() {
    const { element } = this.props;
    this.ElementTag = React.createElement(element, null, '');
    this.observeElement();
  }

  observeElement() {
    const { callBack, config } = this.props;
    const observer = new IntersectionObserver(callBack, config);
    observer.observe(this.ref.current);
  }

  render() {
    const { config, callBack, element, children, ...props } = this.props;
    return React.createElement(element, { ...props, ref: this.ref }, children);
  }
}

Observable.defaultProps = {
  children: null,
  element: 'div',
  config: {
    marginRoot: '0px',
    thresold: 1
  }
};

Observable.propTypes = {
  callBack: PropTypes.func.isRequired,
  children: PropTypes.node,
  element: PropTypes.string,
  config: PropTypes.objectOf(PropTypes.any)
};

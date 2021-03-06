import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Observable extends Component {
  constructor(props) {
    super(props);
    // Create a reference to the element
    this.ref = React.createRef();
    this.observeElement = this.observeElement.bind(this);
    this.observer = {};
  }

  componentDidMount() {
    const { element, callback, config } = this.props;
    this.ElementTag = React.createElement(element, null, '');
    this.observer = new IntersectionObserver(callback, config);
    this.observer.observe(this.ref.current);
  }

  componentWillUnmount() {
    this.observer.unobserve(this.ref.current);
  }

  observeElement() {
    const { callback, config } = this.props;
    const observer = new IntersectionObserver(callback, config);
    observer.observe(this.ref.current);
  }

  render() {
    const { config, callback, element, children, ...props } = this.props;
    return React.createElement(element, { ...props, ref: this.ref }, children);
  }
}

Observable.defaultProps = {
  children: null,
  element: 'div',
  callback: () => {},
  config: {
    marginRoot: '0px',
    thresold: 1
  }
};

Observable.propTypes = {
  callback: PropTypes.func,
  children: PropTypes.node,
  element: PropTypes.string,
  config: PropTypes.objectOf(PropTypes.any)
};

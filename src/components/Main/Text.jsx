import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ThemeConsumer } from '../ThemeContext';

class Text extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {};
    this.updateSize = this.updateSize.bind(this);
    this.textElement = React.createRef();
  }

  componentDidMount() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateSize() {
    const { viewport } = this.props;

    if (this.container.current) {
      const parentWidth = this.container.current.clientWidth;
      const minFontSize = Number.NEGATIVE_INFINITY;
      const maxFontSize = Number.POSITIVE_INFINITY;
      const comp = viewport < 600 ? 0.85 : 0.77;
      const fontSize = Math.max(
        Math.min(parentWidth / (comp * 10), parseFloat(maxFontSize)),
        parseFloat(minFontSize)
      );
      this.setState({
        fontSize: `${fontSize}px`
      });
    }
  }

  render() {
    const { fontSize } = this.state;
    return (
      <div
        className="intro container grid__item--full-width"
        ref={this.container}
      >
        <h1
          id="intro-heading"
          className="intro__header text-center bodoni-24"
          ref={this.textElement}
          style={fontSize ? { fontSize } : null}
        >
          Antonio Fullone
        </h1>
        <div className="tagline">
          <h2 className="intro__tagline text-center bodoni-24">
            Designer &amp; Developer
          </h2>
          <span className="i-am-cool text-center bodoni-24">Wannabe Cook</span>
        </div>
        <span className="intro__qualified text-center bodoni-24">
          {'- Vespa Driver - '}
        </span>
      </div>
    );
  }
}

Text.propTypes = {
  viewport: PropTypes.number.isRequired
};

const TextContainer = () => (
  <ThemeConsumer>
    {({ viewport }) => <Text viewport={viewport} />}
  </ThemeConsumer>
);

export default TextContainer;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FluidText from 'react-fluid-text';

import { ThemeConsumer } from '../ThemeContext';

const Text = props => {
  const { isLoading } = props;

  return (
    <div className="intro container">
      <FluidText
        className={classnames('intro__header', 'text-center', 'bodoni-24', {
          'is-loaded': !isLoading
        })}
        compressor={0.8}
        text="Antonio Fullone"
      />
      <div className="tagline">
        <h2
          className={classnames('intro__tagline', 'text-center', 'bodoni-24', {
            'is-loaded': !isLoading
          })}
        >
          Designer &amp; Developer
        </h2>
        <span className="i-am-cool text-center bodoni-24">Wannabe Cook</span>
      </div>
      <span className="intro__qualified text-center bodoni-24">
        {'- Vespa Driver - '}
      </span>
    </div>
  );
};

Text.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

const TextContainer = () => (
  <ThemeConsumer>
    {({ viewport, animateElement }) => (
      <Text viewport={viewport} animateElement={animateElement} />
    )}
  </ThemeConsumer>
);

export default TextContainer;

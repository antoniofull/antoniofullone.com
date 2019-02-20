import React from 'react';

import ItalianBanner from '../../images/italy_banner.svg';
import Vespa from '../../images/vespa.svg';
import Observable from '../Observable';
import { ThemeConsumer } from '../ThemeContext';

const Illustration = () => (
  <ThemeConsumer>
    {({ animateElement }) => (
      <div className="illustration">
        <div className="illustration__container">
          <ItalianBanner className="italy" />
          <Observable
            data-theme="primary-light"
            className="vespa"
            callback={animateElement}
          >
            <Vespa />
          </Observable>
        </div>
      </div>
    )}
  </ThemeConsumer>
);

export default Illustration;

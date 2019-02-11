import React from 'react';

import { ThemeConsumer } from '../ThemeContext';
import Text from './Text';
import Illustration from './Illustration';

const Main = () => (
  <ThemeConsumer>
    {({ viewport }) => (
      <React.Fragment>
        <div className="container container--intro grid">
          <Text viewport={viewport} />
          <Illustration />
        </div>
      </React.Fragment>
    )}
  </ThemeConsumer>
);

export default Main;

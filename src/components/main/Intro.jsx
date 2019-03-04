import React from 'react';

import { ThemeConsumer } from '../ThemeContext';
import Text from './Text';
import Illustration from './Illustration';
import Skeleton from '../Skeleton';

// CSS
import '../../styles/intro.css';
const Main = () => (
  <ThemeConsumer>
    {({ viewport, isLoading }) => (
      <React.Fragment>
        <div className="container container--intro grid">
          {isLoading ? <Skeleton /> : <Text viewport={viewport} />}
          <Illustration />
        </div>
      </React.Fragment>
    )}
  </ThemeConsumer>
);

export default Main;

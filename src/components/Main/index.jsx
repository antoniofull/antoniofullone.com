import React from 'react';

import Text from './Text';
import Illustration from './Illustration';

const Main = () => (
  <section id="intro" data-area="intro" className="main-section">
    <div className="container container--intro grid">
      <Text />
      <Illustration />
    </div>
  </section>
);

export default Main;

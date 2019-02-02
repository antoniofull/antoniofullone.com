import React from 'react';

import ItalianBanner from '../../images/italy_banner.svg';
import Vespa from '../../images/vespa.svg';

const Illustration = () => (
  <div className="illustration grid__item--full-width">
    <div className="illustration__container">
      <ItalianBanner className="italy" />
      <Vespa className="vespa" />
    </div>
  </div>
);

export default Illustration;

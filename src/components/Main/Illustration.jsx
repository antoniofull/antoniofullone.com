import React from 'react';

import ItalianBanner from '../../images/italy_banner.svg';
import Vespa from '../../images/vespa.svg';

const Illustration = props => (
    <div className='illustration'>
        <div className='illustration__container'>
            <ItalianBanner className='italy'/>
            <Vespa className='vespa'/>
        </div>
    </div>
);

export default Illustration;

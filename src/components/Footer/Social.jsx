import React from 'react';

import {socialData} from '../../data';

const Social = () => (
    <section className='social social--footer'>
        <ul>
        {
            socialData.map(social => (
                <li key={social.id}>
                <a href={social.link}>
                    <i className={`${social.style} fa-${social.icon}`}></i>
                </a>
            </li>
            ))
        }
        </ul>
    </section>
);

export default Social;
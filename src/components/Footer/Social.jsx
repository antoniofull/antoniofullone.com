import React from 'react';

import {socialData} from '../../data';

const Social = () => (
    <div>
        <ul>
            {socialData.length > 0 && socialData.map(item => (
                <li key={item.id}>
                    <a href={item.link}>{item.label}</a>
                </li>
            ))}
        </ul>
    </div>
);

export default Social;
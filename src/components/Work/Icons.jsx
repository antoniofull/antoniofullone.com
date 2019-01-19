import React from 'react';

import {work} from '../../data';

const Icons = () => (
    <div>
        {work.icons.map(icon => (
            <div key={icon.id}>
                <img src={icon.link} alt={icon.label} />
                <span>{icon.label}</span>
            </div>
        ))}
    </div>
);

export default Icons;
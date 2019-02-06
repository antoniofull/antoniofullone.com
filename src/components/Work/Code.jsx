import React from 'react';

import { work } from '../../data';

const Code = () => (
  <div>
    {work.code.map(item => (
      <div key={item.id}>
        <img src={item.link} alt={item.label} />
        <span>{item.label}</span>
      </div>
    ))}
  </div>
);

export default Code;

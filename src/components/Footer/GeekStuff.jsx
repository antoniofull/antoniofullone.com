import React from 'react';
import {geekItems} from '../../data';

const GeekStuff = () => (
    <div>
        <h3>Reading List</h3>
        <ul>
            {geekItems.length > 0 && geekItems.map(item => (
              <li key={item.id}>
                <a href={item.link}>{item.title}</a>
              </li>  
            ))}
        </ul>
    </div>
);

export default GeekStuff;
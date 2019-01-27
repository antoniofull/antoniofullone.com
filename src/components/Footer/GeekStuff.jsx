import React from 'react';
import {geekItems} from '../../data';

const GeekStuff = () => (
    <section className='credits'>
        <h3 className='footer-header'>Credits</h3>
        <ul>
            {geekItems.length > 0 && geekItems.map(item => (
              <li key={item.id}>
                <a href={item.link}>{item.title}</a>
              </li>  
            ))}
        </ul>
    </section>
);

export default GeekStuff;
import React from 'react';
import { credits } from '../../../data';
import Item from './CreditItem';

const Credits = () => (
  <section className="credits extra">
    <h3 className="footer-header">Credits</h3>
    <ul>
      {credits.length > 0 &&
        credits.map(item => <Item key={item.id} item={item} />)}
    </ul>
  </section>
);

export default Credits;

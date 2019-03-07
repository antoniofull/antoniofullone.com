import React from 'react';
import ReactMarkdown from 'react-markdown';

import { addressData } from '../../data';

const Address = () => (
  <address className="info-address">
    <h3 className="footer-header text-white">Antonio Fullone</h3>
    <ReactMarkdown source={addressData} />
  </address>
);

export default Address;

import React from 'react';
import ReactMarkdown from 'react-markdown';

import {aboutText}  from '../../data';

import Thanks from '../../images/thanks.svg';

const About = props => (
    <section className='grid-margin--half about-section margin-y' id='about'>
        <ReactMarkdown source={aboutText} />
        <Thanks />
    </section>
);

export default About;
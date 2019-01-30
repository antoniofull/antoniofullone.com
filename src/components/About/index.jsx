import React from 'react';
import ReactMarkdown from 'react-markdown';

import {aboutText}  from '../../data';

const About = props => (
    <section className='grid-margin--half about-section margin-y' id='about'>
        <ReactMarkdown source={aboutText} />
    </section>
);

export default About;
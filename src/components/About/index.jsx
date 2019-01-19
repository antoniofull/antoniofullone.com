import React from 'react';
import ReactMarkdown from 'react-markdown';

import {aboutText}  from '../../data';

import Thanks from '../../images/thanks.svg';

const About = props => (
    <section>
        <div>
            <ReactMarkdown source={aboutText} />
            <Thanks />
        </div>
    </section>
);

export default About;
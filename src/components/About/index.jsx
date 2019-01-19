import React from 'react';
import ReactMarkdown from 'react-markdown';

import {aboutText}  from '../../data';

const About = props => (
    <section>
        <div>
            <ReactMarkdown source={aboutText} />
        </div>
    </section>
);

export default About;
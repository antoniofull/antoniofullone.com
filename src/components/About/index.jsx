import React from 'react';
import ReactMarkdown from 'react-markdown';

import * as data from '../../data';

const About = props => (
    <section>
        <div>
            <ReactMarkdown source={data.about} />
        </div>
    </section>
);

export default About;
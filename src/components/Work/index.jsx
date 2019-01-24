import React from 'react';

import WorkNavigation from './WorkNavigation';
import Project from './Project';
import Icons from './Icons';
import Code from './Code';
import Design from './Design';

const Work = () => (
    <section class='grid-margin--half work-section'>
        <WorkNavigation />
        <Project />
        <Code />
        <Design />
        <Icons />
    </section>
);

export default Work;
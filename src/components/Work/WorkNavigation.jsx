import React from 'react';

import {work} from '../../data';

const WorkNavigation = () => (
    <nav>
        <ul>
            <li>
                Projects
                <ul>
                    {work.projects.length >0 && work.projects.map(project => (
                        <li key={project.id}><a href={`#${project.anchor}`}>{project.title}</a></li>
                    ))}
                </ul>
            </li>
            <li>Code</li>
            <li>Design</li>
            <li>Icons</li>
        </ul>
    </nav>
);

export default WorkNavigation;

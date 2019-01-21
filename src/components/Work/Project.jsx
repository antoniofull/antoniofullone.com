import React from 'react';

import {work} from '../../data';

const Project = () => (
    <div>
        {work.projects.length > 0 && work.projects.map(project => (
            <article key={project.id}>
                <header>
                    <h2>{project.title}</h2>
                </header>
                <p>{project.description}</p>
                <h4>Stack</h4>
                <ul>
                    {project.stack.map((stack, i) => (
                        <li key={`stack-${i}`}>{stack}</li>
                    ))}
                </ul>
                <div>
                    <img src={project.mainImage} alt={project.title} />
                    <ul>
                        {project.links.map(link => {
                            <li key={link.id}>
                                <a href={link.url}>{link.title}</a>
                            </li>
                        })}
                    </ul> 
                </div>
                <div>
                    {project.sections.map(section => (
                        <div key={section.id}>
                            <p>{section.text}</p>
                            <div>
                                {section.images.map(img => (
                                    <img src={img.source} key={img.id} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </article>
        ))}
    </div>
);

export default Project;
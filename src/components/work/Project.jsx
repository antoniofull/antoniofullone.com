import React from 'react';

import { work } from '../../data';

const Project = () => (
  <div>
    {work.projects.length > 0 &&
      work.projects.map(project => (
        <article key={project.id} className="project padding-x-half">
          <header
            className={`project__header padding-y-half ${project.className}`}
          >
            <h2>{project.title}</h2>
          </header>
          <p className="project__description margin-y">{project.description}</p>
          <h4>Stack</h4>
          <ul>
            {project.stack.map(stack => (
              <li key={stack}>{stack}</li>
            ))}
          </ul>
          <div>
            <img src={project.mainImage} alt={project.title} />
            <ul>
              {project.links.map(link => (
                <li key={link.id}>
                  <a href={link.url}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {project.sections.map(section => (
              <div key={section.id}>
                <p className="project__text">{section.text}</p>
                <div>
                  {section.images.map(img => (
                    <img src={img.source} alt={img.label} key={img.id} />
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

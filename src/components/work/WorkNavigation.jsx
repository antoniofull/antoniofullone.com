import React from 'react';

import { work } from '../../data';

const WorkNavigation = () => (
  <nav className="work-nav margin-y-xl">
    <ul className="nav-list padding-x-half">
      <li className="nav-list__item text-center">
        <a href="#Projects">Projects</a>
        <ul>
          {work.projects.length > 0 &&
            work.projects.map(project => (
              <li key={project.id}>
                <a href={`#${project.anchor}`}>{project.title}</a>
              </li>
            ))}
        </ul>
      </li>
      <li className="nav-list__item text-center">
        <a href="#code">Code</a>
      </li>
      <li className="nav-list__item text-center">
        <a href="#design">Design</a>
      </li>
      <li className="nav-list__item text-center">
        <a href="#icons">Icons</a>
      </li>
    </ul>
  </nav>
);

export default WorkNavigation;

import React from 'react';
import PropTypes from 'prop-types';

import Observable from '../Observable';
import { ThemeConsumer } from '../ThemeContext';

const Temp = ({ companies }) => (
  <div className="container has-gutter-outside">
    <article className="work--temp freight-sans">
      <header>
        <h2>Work</h2>
      </header>
      <ThemeConsumer>
        {({ animateElement }) => (
          <Observable
            element="p"
            className="work-intro"
            callback={animateElement}
            config={{
              thresold: 0.5
            }}
          >
            Most of the projects and code I work on is hosted on private
            repositories or protected by DNA. A portfolio of new projects is
            coming soon. Below there is a list of the major companies I worked
            with in the last years. For anything else you can check the{' '}
            <a href="#about">about</a> section
          </Observable>
        )}
      </ThemeConsumer>
      <div className="companies grid">
        {companies.map(company => (
          <a className="company" href={company.link} key={company.id}>
            <figure>
              <img
                data-src={`https://www.antoniofullone.com${company.img}`}
                alt={company.label}
              />
              <figcaption className="animated company__label">
                {company.label}
              </figcaption>
            </figure>
          </a>
        ))}
      </div>
    </article>
  </div>
);

Temp.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.any).isRequired
};
export default Temp;

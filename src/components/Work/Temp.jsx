import React from 'react';
import PropTypes from 'prop-types';

const Temp = ({ companies }) => (
  <article className="work--temp">
    <header>
      <h2>Work</h2>
    </header>
    <p className="work-intro">
      Most of the projects and code I work on is hosted on private repositories
      or protected by DNA. A portfolio of new projects is coming soon. Below
      there is a list of the major companies I worked with in the last years.
      For anything else you can check the <a href="/about">about</a> section
    </p>
    <div className="companies grid">
      {companies.map(company => (
        <a className="company" href={company.link} key={company.id}>
          <figure>
            <img data-src={company.img} alt={company.label} />
            <caption className="animated company__label">
              {company.label}
            </caption>
          </figure>
        </a>
      ))}
    </div>
  </article>
);

Temp.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.any).isRequired
};
export default Temp;

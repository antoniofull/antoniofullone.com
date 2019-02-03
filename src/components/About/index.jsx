import React from 'react';
import ReactMarkdown from 'react-markdown';

import { aboutText } from '../../data';
import img from '../../images/me.png';

const About = () => (
  <section className="about-section" id="about">
    <article>
      <header>
        <h1 className="freight-sans--bold">Ciao! Nice to meet you!</h1>
      </header>
      <figure>
        <img
          className="about__img"
          src={img}
          alt="Surfing in the Canary Islands"
        />
        <figcaption className="img-caption freight-sans--light">
          Surfing in the Canary Islands. Photo credits:
          <a href="https://surfingtherapy.es">Surfing Therapy</a>
        </figcaption>
      </figure>
      <div className="about__content">
        <ReactMarkdown source={aboutText} />
      </div>
    </article>
  </section>
);

export default About;

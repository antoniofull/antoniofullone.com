import React from 'react';
import ReactMarkdown from 'react-markdown';

import { aboutText, socialData, files, websites } from '../../data';
import img from '../../images/me.png';
import Social from '../social';
import Files from '../files';
import Websites from '../websites';

const About = () => (
  <section className="about-section container has-gutter-outside" id="about">
    <article className="about">
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
      <aside className="about__links has-shadows">
        <div className="social">
          <Social data={socialData} />
        </div>
        <div className="files">
          <Files data={files} />
        </div>
        <div className="websites">
          <Websites data={websites} />
        </div>
      </aside>
    </article>
    <button type="button" className="btn rounded cta btn--about">
      <i className="fas fa-link" />
    </button>
  </section>
);

export default About;

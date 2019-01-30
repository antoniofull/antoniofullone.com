import React from 'react';
import ReactMarkdown from 'react-markdown';

import { aboutText } from '../../data';

const About = props => (
    <section className='grid-margin--half about-section' id='about'>
        <article>
            <header>
                <h1 className='freight-sans--bold'>Ciao! Nice to meet you!</h1>
            </header>
            <figure>
                <img className='about__img' src={require('/dist/images/me.png')} alt="Surfing in the Canary Islands" />
                <figcaption className='img-caption freight-sans--light'>Surfing in the Canary Islands, credits to Deborah from <a target="_blank" href="https://surfingtherapy.es">Surfing Therapy</a></figcaption>
            </figure>
            <div className="about__content">
                <ReactMarkdown source={aboutText} />
            </div>
        </article>
    </section>
);

export default About;
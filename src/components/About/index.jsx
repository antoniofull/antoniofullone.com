import React from 'react';
import ReactMarkdown from 'react-markdown';

import { aboutText } from '../../data';

const About = props => (
    <section className='grid-margin--half about-section' id='about'>
        <article>
            <header>
                <h1 className='freight-sans--bold'>Ciao! Nice to meet you!</h1>
            </header>
            <img className='about__img' src={require('/dist/images/me.png')} alt="" />
            <div className="about__content">
                <ReactMarkdown source={aboutText} />
            </div>
        </article>
    </section>
);

export default About;
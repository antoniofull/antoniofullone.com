/* eslint-disable */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import classNames from 'classnames';

import { aboutText, socialData, files, websites } from '../../data';
import img from '../../images/me.png';
import Aside from './AsideContent';
import { ThemeConsumer } from '../ThemeContext';
import Observable from '../Observable';

const Article = styled.article``;

const About = () => (
  <ThemeConsumer>
    {({ animateElement }) => (
      <React.Fragment>
        <Article
          className={classNames('about', 'container', 'has-gutter-outside')}
        >
          <header>
            <Observable
              element="h1"
              data-animation="fadeInUp"
              className="js-animatable no-opacity freight-sans--bold"
              config={{ threshold: 1 }}
              callback={animateElement}
            >
              Ciao! Nice to meet you!
            </Observable>
          </header>
          <Observable
            element="figure"
            data-animation="fadeIn"
            className="js-animatable no-opacity"
            config={{ threshold: 0.5 }}
            callback={animateElement}
          >
            <img
              className="about__img"
              alt="Surfing in the Canary Islands"
              data-src={img}
            />
            <figcaption className="img-caption freight-sans--light">
              Surfing in the Canary Islands. Photo credits:
              <a href="https://surfingtherapy.es">Surfing Therapy</a>
              <div className="img-divider" />
            </figcaption>
          </Observable>
          <Observable
            data-animation="fadeIn"
            className="js-animatable no-opacity about__content"
            config={{ treshold: 0.2 }}
            callback={animateElement}
          >
            <ReactMarkdown source={aboutText} />
          </Observable>
          <aside className="about__links has-shadows">
            <Aside socialData={socialData} files={files} websites={websites} />
          </aside>
        </Article>
        <button
          type="button"
          className="has-shadows btn btn--rounded btn--cta btn--about"
        >
          <i className="fas fa-link" />
        </button>
      </React.Fragment>
    )}
  </ThemeConsumer>
);

export default About;

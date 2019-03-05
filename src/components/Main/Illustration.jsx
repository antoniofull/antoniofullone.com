import React, { Component } from 'react';
import anime from 'animejs';
import ItalianBanner from '../../images/italy_banner.svg';
import Vespa from '../../images/vespa.svg';
import Observable from '../Observable';
import { ThemeConsumer } from '../ThemeContext';

class Illustration extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
  }
  componentDidMount() {
    const vespa = document.querySelector('.vespa');
    const banner = document.querySelector('.italy');
    if (vespa) {
      this.animate('.vespa svg *');
    }
  }
  animate(el) {
    const vespaAnimation = anime({
      targets: '.vespa svg *',
      strokeDashoffset: [anime.setDashoffset, 0],
      delay: anime.stagger(300),
      // translateX: 250,
      easing: 'easeInOutSine',
      duration: 1000,
      delay: 200,
      complete: function() {
        anime({
          targets: '.italy *',
          strokeDashoffset: [anime.setDashoffset, 0],
          opacity: [0, 1],
          delay: anime.stagger(100),
          easing: 'easeInOutSine',
          duration: 500,
          delay: 0,
          complete: function(anim) {
            console.log(anim);
          },
          direction: 'alternate',
          loop: false
        });
      },
      direction: 'alternate',
      loop: false
    });
  }

  render() {
    console.log('rednder');

    return (
      <ThemeConsumer>
        {({ animateElement, isLoading }) => (
          <div className="illustration">
            <div className="illustration__container">
              <ItalianBanner className="italy" />
              <Observable
                data-theme="primary-light"
                className="vespa"
                callback={animateElement}
              >
                <Vespa className={isLoading ? 'hidden' : undefined} />
              </Observable>
            </div>
          </div>
        )}
      </ThemeConsumer>
    );
  }
}

export default Illustration;

import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ item }) => (
  <article key={item.id} className="post">
    <h3 className="post__title">{item.title}</h3>
    <a href={item.link} className="post__link">
      <img className="post__image" src={item.img} alt={item.title} />
    </a>
  </article>
);

Article.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Article;

import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ item }) => (
  <article key={item.id} className="post">
    <h3 className="post__title">
      <a href={item.link}>{item.title}</a>
    </h3>
    <a href={item.link} className="post__link">
      {item.img && (
        <img className="post__image" data-src={item.img} alt={item.title} />
      )}
    </a>
  </article>
);

Article.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Article;

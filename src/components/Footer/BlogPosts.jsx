import React from 'react';

import { blogData } from '../../data';

const BlogPosts = () => (
  <section className="blog grid">
    <h3 className="footer-header footer-header--full grid__item--full-width">
      Latest from the Blog
    </h3>
    {blogData.length > 0 &&
      blogData.map(item => (
        <article key={item.id} className="post">
          <h3 className="post__title text-white">{item.title}</h3>
          <a href={item.link} className="post__link">
            <img className="post__image" src={item.img} alt={item.title} />
          </a>
        </article>
      ))}
  </section>
);

export default BlogPosts;

import React from 'react';

import Article from './Article';
import { blogData } from '../../data';

const BlogPosts = () => (
  <section className="blog grid">
    <h3 className="text-white footer-header footer-header--blog footer-header--full grid__item--full-width">
      Latest from the Blog
    </h3>
    {blogData.length > 0 && blogData.map(item => <Article item={item} />)}
  </section>
);

export default BlogPosts;

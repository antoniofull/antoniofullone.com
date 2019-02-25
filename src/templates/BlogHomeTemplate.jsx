import React from 'react';
import classnames from 'classnames';

import '../styles/blog.css';

const BlogHomeTemplate = ({ posts }) => {
  console.log(posts);
  return (
    <div className="container">
      {posts &&
        posts.map((post, index) => (
          <article
            key={post.node.id}
            className={classnames('blog__post', {
              'blog__post--first': index === 0
            })}
          >
            <header>
              <h2>{post.node.frontmatter.title}</h2>
            </header>
            <img src={post.node.frontmatter.image} alt="" />
            {post.node.frontmatter.introduction && (
              <p>{post.node.frontmatter.introduction}</p>
            )}
          </article>
        ))}
    </div>
  );
};

export default BlogHomeTemplate;

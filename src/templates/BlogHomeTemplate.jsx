import React from 'react';

const BlogHomeTemplate = ({ posts }) => {
  console.log(posts);
  return (
    <div className="container">
      {posts &&
        posts.map((post, index) => (
          <article key={post.node.id} className="blog__post">
            <header>
              <h2>{post.node.frontmatter.title}</h2>
            </header>
            <img src={post.node.frontmatter.image} alt="" />
          </article>
        ))}
    </div>
  );
};

export default BlogHomeTemplate;

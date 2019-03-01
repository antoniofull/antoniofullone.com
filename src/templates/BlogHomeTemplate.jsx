import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';

import '../styles/blog.css';

const BlogHomeTemplate = ({ posts }) => {
  return (
    <div className="container posts">
      {posts &&
        posts.map((post, index) => (
          <Link
            className={classnames('blogpost', {
              'blogpost--first': index === 0
            })}
            key={post.node.id}
            to={post.node.frontmatter.path}
          >
            <article>
              <header>
                {index <= 0 ? (
                  <h1 className="post-title">{post.node.frontmatter.title}</h1>
                ) : (
                  <h2 className="post-title">{post.node.frontmatter.title}</h2>
                )}
                <time
                  className="post-date"
                  dateTime={new Date(post.node.frontmatter.date).toLocaleString(
                    'en-US',
                    {
                      timeZone: 'UTC'
                    }
                  )}
                >
                  {new Date(post.node.frontmatter.date).toLocaleString(
                    'en-US',
                    {
                      timeZone: 'UTC'
                    }
                  )}
                </time>
              </header>
              {post.node.frontmatter.image && (
                <img
                  className="post-image"
                  src={post.node.frontmatter.image}
                  alt=""
                />
              )}

              {post.node.frontmatter.introduction && (
                <p>{post.node.frontmatter.introduction}</p>
              )}
            </article>
          </Link>
        ))}
    </div>
  );
};

export default BlogHomeTemplate;

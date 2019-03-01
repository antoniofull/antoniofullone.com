import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import striptags from 'striptags';

import '../styles/blog.css';

class BlogHomeTemplate extends Component {
  constructor(props) {
    super(props);
    this.changeContentSize = this.changeContentSize.bind(this);
    this.state = {
      textLines: 40
    };
  }

  changeContentSize() {
    const breakPoints = {
      mobile: `min-width: 320px`,
      tablet: `min-width: 768px`,
      desktop: `min-width: 1024px`
    };

    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        if (window.matchMedia(`(min-width: 768px)`).matches) {
          this.setState({
            ...this.state,
            textLines: 100
          });
        } else {
          this.setState({
            ...this.state,
            textLines: 40
          });
        }
      }, 0);
    }
  }

  componentDidMount() {
    this.changeContentSize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.changeContentSize);
    }
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="container posts">
        {posts &&
          posts.map((post, index) => (
            <article
              className={classnames('blogpost', {
                'blogpost--first': index === 0
              })}
              key={post.node.id}
            >
              <header className="post-header">
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
                <p className="post-excerpt">
                  {`${striptags(posts[0].node.html)
                    .split(' ')
                    .slice(0, this.state.textLines)
                    .join(' ')} ...`}
                  <Link
                    className={`read-more`}
                    key={post.node.id}
                    to={post.node.frontmatter.path}
                  >
                    Read Post
                  </Link>
                </p>
              )}
            </article>
          ))}
      </div>
    );
  }
}

export default BlogHomeTemplate;

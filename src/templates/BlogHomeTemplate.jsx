import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
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
                'blogpost--first': index === 0,
                'second-row': index > 0 && index < 5,
                'second-row--odd': index === 1 || index === 3,
                'single-row': index > 4
              })}
              key={post.node.id}
            >
              <MediaQuery query="(min-device-width: 1024px)">
                {index === 0 && (
                  <React.Fragment>
                    {post.node.frontmatter.image && (
                      <img
                        className="post-image"
                        src={post.node.frontmatter.image}
                        alt=""
                      />
                    )}
                    <div className="post-content">
                      <header className="post-header">
                        {index <= 0 ? (
                          <h1
                            className={classnames(
                              'post-title',
                              {
                                'bodoni-24': index === 0
                              },
                              {
                                'freight-sans': index > 0
                              }
                            )}
                          >
                            {post.node.frontmatter.title}
                          </h1>
                        ) : (
                          <h2 className="post-title">
                            {post.node.frontmatter.title}
                          </h2>
                        )}
                        <time
                          className="post-date"
                          dateTime={new Date(
                            post.node.frontmatter.date
                          ).toLocaleString('en-US', {
                            timeZone: 'UTC'
                          })}
                        >
                          {new Date(post.node.frontmatter.date).toLocaleString(
                            'en-US',
                            {
                              timeZone: 'UTC'
                            }
                          )}
                        </time>
                      </header>
                      {post.node.frontmatter.introduction && (
                        <p className="post-excerpt">
                          {`${striptags(posts[0].node.html)
                            .split(' ')
                            .slice(0, index === 0 ? this.state.textLines : 40)
                            .join(' ')} ...`}
                        </p>
                      )}
                      <Link
                        className={`read-more`}
                        key={post.node.id}
                        to={post.node.frontmatter.path}
                      >
                        Read Post
                      </Link>
                    </div>
                  </React.Fragment>
                )}
                {index > 0 && index < 5 && (
                  <React.Fragment>
                    <div className="post-content">
                      <header className="post-header">
                        {index <= 0 ? (
                          <h2
                            className={classnames(
                              'post-title',
                              {
                                'bodoni-24': index === 0
                              },
                              {
                                'freight-sans': index > 0
                              }
                            )}
                          >
                            {post.node.frontmatter.title}
                          </h2>
                        ) : (
                          <h2 className="post-title">
                            {post.node.frontmatter.title}
                          </h2>
                        )}
                        <time
                          className="post-date"
                          dateTime={new Date(
                            post.node.frontmatter.date
                          ).toLocaleString('en-US', {
                            timeZone: 'UTC'
                          })}
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
                            .slice(0, index === 0 ? this.state.textLines : 40)
                            .join(' ')} ...`}
                        </p>
                      )}
                      <Link
                        className={`read-more`}
                        key={post.node.id}
                        to={post.node.frontmatter.path}
                      >
                        Read Post
                      </Link>
                    </div>
                  </React.Fragment>
                )}
                {index > 4 && (
                  <React.Fragment>
                    {post.node.frontmatter.image && (
                      <img
                        className="post-image"
                        src={post.node.frontmatter.image}
                        alt=""
                      />
                    )}
                    <div className="post-content">
                      <header className="post-header">
                        {index <= 0 ? (
                          <h2
                            className={classnames(
                              'post-title',
                              {
                                'bodoni-24': index === 0
                              },
                              {
                                'freight-sans': index > 0
                              }
                            )}
                          >
                            {post.node.frontmatter.title}
                          </h2>
                        ) : (
                          <h2 className="post-title">
                            {post.node.frontmatter.title}
                          </h2>
                        )}
                        <time
                          className="post-date"
                          dateTime={new Date(
                            post.node.frontmatter.date
                          ).toLocaleString('en-US', {
                            timeZone: 'UTC'
                          })}
                        >
                          {new Date(post.node.frontmatter.date).toLocaleString(
                            'en-US',
                            {
                              timeZone: 'UTC'
                            }
                          )}
                        </time>
                      </header>
                      {post.node.frontmatter.introduction && (
                        <p className="post-excerpt">
                          {`${striptags(posts[0].node.html)
                            .split(' ')
                            .slice(0, index === 0 ? this.state.textLines : 40)
                            .join(' ')} ...`}
                        </p>
                      )}
                      <Link
                        className={`read-more`}
                        key={post.node.id}
                        to={post.node.frontmatter.path}
                      >
                        Read Post
                      </Link>
                    </div>
                  </React.Fragment>
                )}
              </MediaQuery>
              <MediaQuery query="(max-device-width: 1023px)">
                <header className="post-header">
                  {index <= 0 ? (
                    <h2 className="post-title">
                      {post.node.frontmatter.title}
                    </h2>
                  ) : (
                    <h2 className="post-title">
                      {post.node.frontmatter.title}
                    </h2>
                  )}
                  <time
                    className="post-date"
                    dateTime={new Date(
                      post.node.frontmatter.date
                    ).toLocaleString('en-US', {
                      timeZone: 'UTC'
                    })}
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
                  </p>
                )}
                <Link
                  className={`read-more`}
                  key={post.node.id}
                  to={post.node.frontmatter.path}
                >
                  Read Post
                </Link>
              </MediaQuery>
            </article>
          ))}
      </div>
    );
  }
}

export default BlogHomeTemplate;

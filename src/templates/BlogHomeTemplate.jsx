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
          posts.map(post => (
            <article className="blogpost" key={post.node.id}>
              <header classnames="post-header">
                <Link
                  className={`read-more`}
                  key={post.node.id}
                  to={post.node.frontmatter.path}
                >
                  <h2 className="post-title">{post.node.frontmatter.title}</h2>
                  <time
                    className="post-date"
                    dateTime={new Date(
                      post.node.frontmatter.date
                    ).toDateString()}
                  >
                    {new Date(post.node.frontmatter.date).toDateString()}
                  </time>
                </Link>
              </header>
            </article>
          ))}
      </div>
    );
  }
}

export default BlogHomeTemplate;

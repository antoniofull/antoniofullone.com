import striptags from 'striptags';
import { Helmet } from 'react-helmet';
import React from 'react';
import { Link } from 'gatsby';
import { RaceOperator } from 'rxjs/internal/observable/race';

function calculateReadingTime(html) {
  if (!html) return 'less than a minute';
  let readingTime =
    striptags(html)
      .trim()
      .split(/\s+/).length / 200;
  return Math.floor(readingTime);
}

const Postlayout = ({ post, prev, next }) => (
  <>
    {post && (
      <React.Fragment>
        <Helmet>
          <title>{post.frontmatter.title}</title>
          <link
            rel="canonical"
            href={`https://www.antoniofullone.com/${post.frontmatter.path}`}
          />
          <meta name="description" content={post.excerpt} />
        </Helmet>
        <article className="post single container has-gutter-outside">
          <header>
            <h1 className="post__title">{post.frontmatter.title}</h1>
            <div className="post__meta freight-sans">
              <time
                className="post__date"
                dateTime={new Date(post.frontmatter.date).toLocaleString(
                  'en-US',
                  {
                    timeZone: 'UTC'
                  }
                )}
              >
                {new Date(post.frontmatter.date).toLocaleString('en-US', {
                  timeZone: 'UTC'
                })}{' '}
              </time>
              <span className="reading-time">
                {' '}
                - Reading Time: {calculateReadingTime(post.html)} minutes
              </span>
            </div>
          </header>
          {post.frontmatter.image && (
            <picture className="main-image">
              <img
                className="post-image"
                src={post.frontmatter.image}
                alt={post.frontmatter.imageDesc}
              />
              <figcaption className="freight-sans--light">
                {post.frontmatter.imageDesc}
              </figcaption>
            </picture>
          )}

          <div
            className="post__content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
        <section className="follow-links container margin-y-l">
          <ul className="next-previous">
            {prev && (
              <li className="prev">
                <Link className="prev-post" to={prev.frontmatter.path}>
                  {prev.frontmatter.title}
                </Link>
              </li>
            )}
            {next && (
              <li className="next">
                <Link className="next-post" to={next.frontmatter.path}>
                  {next.frontmatter.title}
                </Link>
              </li>
            )}
          </ul>
        </section>{' '}
      </React.Fragment>
    )}
  </>
);

export default Postlayout;

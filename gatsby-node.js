/* eslint-disable */
const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/pages/post.js`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              category
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach(({ node }, index) => {
      const prev = index === 0 ? false : posts[index - 1].node;
      const next =
        posts[posts.length - 1] === posts[index]
          ? false
          : posts[index + 1].node;
      createPage({
        path: `${node.frontmatter.path}`,
        component: postTemplate,
        context: {
          category: node.frontmatter.category,
          prev,
          next
        }
      });
    });
  });
};

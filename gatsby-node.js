/* eslint-disable */
const path = require('path');

exports.onCreatePage = ({ page, actions }) => {
  console.log('the page is: ', page.path);
};

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
              title
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
      const prev = posts[index - 1] ? posts[index - 1].node : false;
      const next = posts[index + 1] ? posts[index + 1].node : false;

      createPage({
        path: `${node.frontmatter.path}`,
        component: postTemplate,
        context: {
          category: node.frontmatter.category,
          postId: node.id,
          prev,
          next
        }
      });
    });
  });
};

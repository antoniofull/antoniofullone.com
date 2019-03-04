const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Antonio Fullone Personal Website`,
    description: 'Personal Website of Antonio Fullone, Designer &amp; Developer'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: []
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/_posts/`,
        name: 'blog'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
        name: 'data'
      }
    }
  ]
};

/**
 * {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        typekit: {
          id: `avo5hes`
        }
      }
    },
 */

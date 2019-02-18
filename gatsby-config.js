module.exports = {
  siteMetadata: {
    title: `Antonio Fullone`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        typekit: {
          id: 'avo5hes'
        }
      }
    }
  ]
};

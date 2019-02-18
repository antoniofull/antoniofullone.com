module.exports = {
  siteMetadata: {
    title: `Antonio Fullone`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
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

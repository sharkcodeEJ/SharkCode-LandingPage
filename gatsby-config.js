module.exports = {
  siteMetadata: {
    title: 'Sharkcode',
    description:
      'Somos uma Empresa Júnior de Jovens Empreendedores',
    mediaSocials: {
      linkedin : 'https://www.linkedin.com/company/sharkcode',
      facebook : 'https://www.facebook.com/Sharkcode-102699914883617',
      github  : 'https://github.com/sharkcodeEJ',
      instagram : 'https://www.instagram.com/sharkcodejr/'

    }
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
              modulePath: `${__dirname}/src/cms/cms.js`,
            },
          },
          'gatsby-plugin-netlify', // make sure to keep it last in the array
        ],
      },
    },
  ]
}

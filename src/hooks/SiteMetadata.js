import { graphql, useStaticQuery } from 'gatsby'

/**
 * @return {{ title :string,
    description :string,
    mediaSocials :{
      linkedin :string,
      facebook :string,
      github :string,
      instagram :string
    }}}
 */
const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        
          site {
            siteMetadata {
              title
              description
              mediaSocials {
                linkedin
                facebook
                github
                instagram
              }
            }
          }
        }
    `
  )

 
  return site.siteMetadata
}

export default useSiteMetadata

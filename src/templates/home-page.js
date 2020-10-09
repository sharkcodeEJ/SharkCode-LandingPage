import { title } from 'case';
import PropTypes from 'prop-types';
import React from 'react';
import {graphql, Link} from 'gatsby';

import facebookIcon from '../../static/assets/icons/facebook.svg';
import githubIcon from '../../static/assets/icons/github.svg';
import InstagramIcon from '../../static/assets/icons/instagram.svg';
import linkedinIcon from '../../static/assets/icons/linkedin.svg';

import logo from '../../static/assets/sharklogo.svg';


import Layout from "../components/Layout";
import useSiteMetadata from '../hooks/SiteMetadata';

export const PageHomeTemplate = ({title,description,button})=>{
    const {mediaSocials} = useSiteMetadata()

return ( 
    <Layout>
        <section id="page-home">
            <div class="content">
                <header>
                    <img src={logo} alt="SharkCode logo"/>
                </header>
                <article>
                    <div class="headline">
                        <h1>{title}</h1>
                        <p>{description}</p>
                    <a href={button.url}><strong>{button.content}</strong></a>
                    </div>
                    <div class="socialmedia">
                        <a href={mediaSocials.linkedin} target="_blank"><img src={linkedinIcon} alt="Linkedin"/></a>
                        <a href={mediaSocials.github}  target="_blank"><img src={githubIcon}alt="Github"/></a>
                        <a href={mediaSocials.instagram}  target="_blank"><img src={InstagramIcon} alt="Instagram"/></a>
                        <a href={mediaSocials.facebook}  target="_blank"><img src={facebookIcon} alt="Facebook"/></a>
                    </div>
                </article>
            </div>
            <div id="footer"></div>
            <div id="division"></div>
            <div id="wave"></div> 
        </section>
    </Layout>
);
}

PageHomeTemplate.protoTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    button : {
        url : PropTypes.string.isRequired,
        content : PropTypes.string.isRequired
    }
}

const PageHome = ({data})=>{
   const content = data.markdownRemark.frontmatter;
return(
    <PageHomeTemplate
    title={content.title}
    description={content.description}
    button={content.button}
    />
);
}



export const query = graphql`
    query HomePageQuery {
    markdownRemark(frontmatter: {templateKey: {eq: "home-page"}}) {
        frontmatter {
        description
        title
        button {
            content
            url
        }
        }
    }
    }
`;

export default PageHome;
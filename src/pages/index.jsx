import React, { Component } from "react";
import Helmet from "react-helmet";
import "font-awesome/css/font-awesome.min.css";
import FeaturedProjectList from "../components/FeaturedProjectList/FeaturedProjectList";
import SEO from "../components/SEO/SEO";
import Cover from "../components/Cover/Cover";
import Footer from "../components/Footer/Footer";
import BackTop from "../components/BackTop/BackTop";
import config from "../../data/SiteConfig";

export default class Index extends Component {

  render() {
    const projectEdges = this.props.data.allMarkdownRemark.edges;
    const imgUrl = "http://images.contentful.com/uftyz5b3faoy/1mOIOmBwNa2o4iQukgmgoA/75202a71efece6a6762fc2b4439fe95b/BaillatSite_HeroImage_Template2.jpg";
    return (
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        <SEO projectEdges={projectEdges} />
        <Cover url={imgUrl} fixed />
        <FeaturedProjectList projectEdges={projectEdges} />
        <Footer config={config} />
        <Cover url={imgUrl} fixed />
        <BackTop />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { audience: { eq: "row" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            featured
            cover {
              childImageSharp {
                sizes(maxWidth: 1600, quality: 95) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            featuredImages {
              childImageSharp {
                sizes(maxWidth: 1200, quality: 95) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;

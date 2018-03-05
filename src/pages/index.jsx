import React, { Component } from "react";
import Helmet from "react-helmet";
import "font-awesome/css/font-awesome.min.css";

import ProjectListing from "../components/ProjectListing/ProjectListing";
import SEO from "../components/SEO/SEO";
import Cover from "../components/Cover";
import config from "../../data/SiteConfig";

import './index.css';

class Index extends Component {

  scrollDown = () => {
    const element = document.getElementById("start");
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  render() {
    const projectEdges = this.props.data.allMarkdownRemark.edges;
    const imgUrl = "http://images.contentful.com/uftyz5b3faoy/1mOIOmBwNa2o4iQukgmgoA/75202a71efece6a6762fc2b4439fe95b/BaillatSite_HeroImage_Template2.jpg";
    return (
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        <SEO projectEdges={projectEdges} />
        <Cover coverImg={imgUrl} />
        <ProjectListing projectEdges={projectEdges} />
      </div>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
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
            cover
            date
          }
        }
      }
    }
  }
`;

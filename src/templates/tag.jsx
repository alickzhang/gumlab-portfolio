import React, { Component } from "react";
import Helmet from "react-helmet";
import Cover from "../components/Cover/Cover";
import ProjectList from "../components/ProjectList/ProjectList";
import Footer from "../components/Footer/Footer";
import BackTop from "../components/BackTop/BackTop";
import config from "../../data/SiteConfig";

export default class TagTemplate extends Component {

  render() {
    const projectEdges = this.props.data.allMarkdownRemark.edges;
    const { tag } = this.props.pathContext;
    const imgUrl = "http://images.contentful.com/uftyz5b3faoy/1mOIOmBwNa2o4iQukgmgoA/75202a71efece6a6762fc2b4439fe95b/BaillatSite_HeroImage_Template2.jpg";
    return (
      <div className="tag-container">
        <Helmet title={`Projects tagged as "${tag}" | ${config.siteTitle}`} />
        <Cover url={imgUrl} fixed title={`#${tag}`} />
        <ProjectList projectEdges={projectEdges} />
        <Footer config={config} />
        <Cover url={imgUrl} fixed title={`#${tag}`} />
        <BackTop />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } }, fields: { audience: { eq: "row" } } }
    ) {
      totalCount
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
            cover {
              childImageSharp {
                sizes(maxWidth: 1600, quality: 95) {
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

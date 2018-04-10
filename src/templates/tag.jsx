import React, { Component } from "react";
import Helmet from "react-helmet";
import Cover from "../components/Cover/Cover";
import Header from "../components/Header/Header";
import ProjectList from "../components/ProjectList/ProjectList";
import Footer from "../components/Footer/Footer";
import BackTop from "../components/BackTop/BackTop";
import config from "../../data/SiteConfig";

export default class TagTemplate extends Component {

  state = {
    cover: null
  }

  componentWillMount() {
    const projectEdges = this.props.data.allMarkdownRemark.edges;
    const randomEdge = projectEdges[Math.floor(Math.random() * projectEdges.length)];
    const { cover } = randomEdge.node.frontmatter;
    this.setState({ cover });
  }

  render() {
    const projectEdges = this.props.data.allMarkdownRemark.edges;
    const { tag } = this.props.pathContext;
    const { cover } = this.state;
    return (
      <div className="tag-container">
        <Helmet title={`Projects tagged as "${tag}" | ${config.siteTitle}`} />
        <Cover cover={cover} fadein fixed title={`#${tag}`} />
        <Header />
        <ProjectList projectEdges={projectEdges} />
        <Footer config={config} />
        <Cover cover={cover} fixed title={`#${tag}`} />
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
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

import React, { Component } from "react";
import Helmet from "react-helmet";
import About from "../components/About/About";
import config from "../../data/SiteConfig";

export default class AboutPage extends Component {

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
    const { cover } = this.state;
    return (
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />
        <About cover={cover} />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query AboutQuery {
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

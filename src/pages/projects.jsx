import React, { Component } from "react";
import Helmet from "react-helmet";
import Cover from "../components/Cover/Cover";
import Header from "../components/Header/Header";
import ProjectList from "../components/ProjectList/ProjectList";
import Footer from "../components/Footer/Footer";
import BackTop from "../components/BackTop/BackTop";
import config from "../../data/SiteConfig";

export default class Projects extends Component {

  state = {
    cover: null,
    projectPathPrefix: ''
  }

  componentWillMount() {
    const projectEdges = this.props.data.allMarkdownRemark.edges;
    const randomEdge = projectEdges[Math.floor(Math.random() * projectEdges.length)];
    const { cover } = randomEdge.node.frontmatter;
    this.setState({ cover });
    if (typeof window !== 'undefined') {
      /* eslint global-require: "off" */
      const lookupRequesterIp = require("../shared/requesterIpLookupBehaviour");
      lookupRequesterIp().then(({ data }) => {
        if (data.country_code === 'CN') {
          this.setState({ projectPathPrefix: 'cn' });
        }
      });
    }
  }

  render() {
    const projectEdges = this.props.data.allMarkdownRemark.edges;
    const { cover, projectPathPrefix } = this.state;
    return (
      <div className="projects-container">
        <Helmet title={`Projects | ${config.siteTitle}`} />
        <Cover cover={cover} fadein fixed />
        <Header />
        <ProjectList projectEdges={projectEdges} projectPathPrefix={projectPathPrefix} />
        <Footer config={config} />
        <Cover cover={cover} fixed />
        <BackTop />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ProjectsQuery {
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

import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import FeaturedProjectList from "../components/FeaturedProjectList/FeaturedProjectList";
import SEO from "../components/SEO/SEO";
import Cover from "../components/Cover/Cover";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BackTop from "../components/BackTop/BackTop";
import config from "../../data/SiteConfig";

export default class Index extends Component {

  state = {
    cover: null,
    loaded: false,
    loading: false,
    projectPathPrefix: ''
  }

  componentWillMount() {
    const projectEdges = this.props.data.allMarkdownRemark.edges;
    const randomEdge = projectEdges[Math.floor(Math.random() * projectEdges.length)];
    const { cover } = randomEdge.node.frontmatter;
    this.setState({ cover, loading: true });
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

  onLoad = () => {
    this.setState({ loaded: true, loading: false });
  }

  render() {
    const projectEdges = this.props.data.allMarkdownRemark.edges;
    const { cover, loaded, loading, projectPathPrefix } = this.state;
    return (
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        <SEO projectEdges={projectEdges} />
        <Cover cover={cover} fixed loading={loading} onLoad={this.onLoad} />
        {
          loaded &&
          <Fragment>
            <Header />
            <FeaturedProjectList projectEdges={projectEdges} projectPathPrefix={projectPathPrefix} />
            <Footer config={config} />
            <Cover cover={cover} fixed />
            <BackTop />
          </Fragment>
        }
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
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
            featuredImages {
              childImageSharp {
                sizes(maxWidth: 1200, quality: 95) {
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

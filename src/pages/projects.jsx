import React, { Component } from "react";
import Helmet from "react-helmet";

import Cover from "../components/Cover/Cover";
import Footer from "../components/Footer/Footer";
import config from "../../data/SiteConfig";

import "./projects.css";

export default class Projects extends Component {

  scrollDown = () => {
    const element = document.getElementById("start");
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  getProjectList() {
    const projectEdges = this.props.data.allMarkdownRemark.edges;
    const projectList = [];
    projectEdges.forEach(({ node }) => {
      projectList.push({
        path: `projects${node.fields.slug}`,
        tags: node.frontmatter.tags,
        cover: node.frontmatter.cover,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        excerpt: node.excerpt,
        timeToRead: node.timeToRead
      });
    });
    return projectList;
  }

  render() {
    const projectList = this.getProjectList();
    const imgUrl = "http://images.contentful.com/uftyz5b3faoy/1mOIOmBwNa2o4iQukgmgoA/75202a71efece6a6762fc2b4439fe95b/BaillatSite_HeroImage_Template2.jpg";
    return (
      <div className="projects-container">
        <Helmet title={`Projects | ${config.siteTitle}`} />
        <Cover url={imgUrl} fadein />
        <div>
          <div className="projects-layout">
            {projectList.map(edge => (
              <div className="project-item">
                <div className="cover-img" style={{ backgroundImage: `url(${edge.cover}`, backgroundSize: 'contain' }}>
                  <img srcSet={edge.cover.childImageSharp.sizes.srcSet} alt="cover" style={{ visibility: 'hidden' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer config={config} />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query projectsQuery {
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


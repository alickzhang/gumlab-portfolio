import React, { Component } from "react";
import Helmet from "react-helmet";

import Cover from "../components/Cover/Cover";
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
    projectEdges.forEach(projectEdge => {
      projectList.push({
        path: `projects${projectEdge.node.fields.slug}`,
        tags: projectEdge.node.frontmatter.tags,
        cover: projectEdge.node.frontmatter.cover,
        title: projectEdge.node.frontmatter.title,
        date: projectEdge.node.frontmatter.date,
        excerpt: projectEdge.node.excerpt,
        timeToRead: projectEdge.node.timeToRead
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
        <Cover coverImg={imgUrl} fadein />
        <div>
          <div className="projects-layout">
            {projectList.map(edge => (
              <div className="project-item">
                <div className="cover-img" style={{ backgroundImage: `url(${edge.cover}`, backgroundSize: 'contain' }}>
                  <img src={edge.cover} alt="cover" style={{ visibility: 'hidden' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
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
              childImageSharp{
                sizes {
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


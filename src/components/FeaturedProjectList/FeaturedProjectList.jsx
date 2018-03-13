/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component } from "react";
import Link from "gatsby-link";
import Feature from "../Feature/Feature";

import "./FeaturedProjectList.css";

class FeaturedProjectList extends Component {

  getProjectList() {
    const projectList = [];
    this.props.projectEdges.forEach(({ node }) => {
      if (node.frontmatter.featured) {
        projectList.push({
          path: `projects${node.fields.slug}`,
          tags: node.frontmatter.tags,
          cover: node.frontmatter.cover,
          title: node.frontmatter.title,
          date: node.frontmatter.date,
          featuredImages: node.frontmatter.featuredImages,
          excerpt: node.excerpt,
          timeToRead: node.timeToRead,
        });
      }
    });
    return projectList;
  }

  render() {
    const projectList = this.getProjectList();
    return (
      <div className="project-list">
        <div className="featured">
          {projectList.map(project => (
            <Feature key={project.title} title={project.title} images={project.featuredImages || []} path={project.path} />
          ))}
        </div>
        <div className="view-all-text"><Link to="/projects">View All Projects</Link></div>
      </div>
    );
  }
}

export default FeaturedProjectList;

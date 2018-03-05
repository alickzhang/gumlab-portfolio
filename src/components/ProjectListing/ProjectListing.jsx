import React, { Component } from "react";
import Link from "gatsby-link";

import Feature from "../Feature/Feature";

import "./ProjectListing.css";

class ProjectListing extends Component {

  getProjectList() {
    const projectList = [];
    this.props.projectEdges.forEach(projectEdge => {
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
    return (
      <div className="project-list">
        <div className="featured">
          {projectList.map(project => (
            <Feature key={project.title} title={project.title} pictures={[project.cover]} path={project.path} />
          ))}
        </div>
        <div className="view-all-text"><Link to="/projects">View All Projects</Link></div>
      </div>
    );
  }
}

export default ProjectListing;

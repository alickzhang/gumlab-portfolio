import React from "react";
import Link from "gatsby-link";

import Feature from "../Feature";

class ProjectListing extends React.Component {
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
      <div>
        {projectList.map(project => (
          <Feature key={project.title} title={project.title} pictures={[project.cover]} path={project.path} />
        ))}
      </div>
    );
  }
}

export default ProjectListing;

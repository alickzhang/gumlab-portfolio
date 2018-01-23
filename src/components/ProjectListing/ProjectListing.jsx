import React from "react";
import Link from "gatsby-link";

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
          <Link to={project.path} key={project.title}>
            <h1>{project.title}</h1>
          </Link>
        ))}
      </div>
    );
  }
}

export default ProjectListing;

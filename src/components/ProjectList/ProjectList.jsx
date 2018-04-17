/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component } from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import "./ProjectList.css";

export default class ProjectList extends Component {

  state = {
    layouts: [],
    height: 0
  }

  componentDidMount() {
    window.addEventListener('resize', this.setLayouts);
    this.setLayouts();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setLayouts);
  }

  getProjectList() {
    const projectList = [];
    this.props.projectEdges.forEach(({ node }) => {
      projectList.push({
        path: `/projects${node.fields.slug}`,
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

  setLayouts = () => {
    const allItems = document.getElementsByClassName("project-item");
    const itemWidth = allItems[0].offsetWidth;
    const columns = Math.floor(window.innerWidth / itemWidth);
    const heightArr = [];
    const layouts = [];
    for (let i = 0; i < allItems.length; i++) {
      const itemHeight = allItems[i].offsetHeight;
      if (i < columns) {
        heightArr.push(itemHeight);
        layouts.push({ top: 0, left: i * itemWidth });
      } else {
        const minItemHeight = Math.min(...heightArr);
        const minItemIndex = heightArr.findIndex(height => height === minItemHeight);
        heightArr[minItemIndex] += itemHeight;
        layouts.push({ top: minItemHeight, left: minItemIndex * itemWidth });
      }
    }
    this.setState({ layouts, height: Math.max(...heightArr) });
  }

  render() {
    const { height, layouts } = this.state;
    const projectList = this.getProjectList();
    const { projectPathPrefix } = this.props;
    return (
      <div className="projects-layout" style={{ height: `calc(${height}px + 4rem)` }}>
        {projectList.map((project, index) => {
          let projectPath = project.path;
          if (projectPathPrefix && projectPathPrefix.length) {
            projectPath = `${projectPathPrefix}${projectPath}`;
          }
          return (
            <Link key={project.title} to={projectPath} className="project-item" style={{ ...layouts[index] }}>
              <div className="project-item-inner">
                <Img sizes={project.cover.childImageSharp.sizes} />
                <div className="project-item-overlay">
                  <h3 className="project-title">{project.title}</h3>
                </div>
              </div>
            </Link>);
          }
        )}
      </div>
    );
  }
}

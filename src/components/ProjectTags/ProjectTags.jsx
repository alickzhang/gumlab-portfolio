import React, { Component } from "react";
import _ from "lodash";
import Link from "gatsby-link";

class ProjectTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className="project-tag-container">
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              style={{ textDecoration: "none" }}
              to={`/tags/${_.kebabCase(tag)}`}
            >
              <button>{tag}</button>
            </Link>
          ))}
      </div>
    );
  }
}

export default ProjectTags;

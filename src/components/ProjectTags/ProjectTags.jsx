/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component } from "react";
import _ from "lodash";
import Link from "gatsby-link";

import "./ProjectTags.css";

export default class ProjectTags extends Component {
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
              <span className="project-tag">{tag}</span>
            </Link>
          ))}
      </div>
    );
  }
}

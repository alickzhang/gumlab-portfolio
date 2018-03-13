/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

import "./Sidebar.css";

export default class Sidebar extends Component {

  render() {
    const { width, open, onSidebarClose } = this.props;
    const transform = open ? 'translateX(0)' : 'translateX(-100%)';
    const visibility = open ? 'visible' : 'hidden';
    return (
      <div className="sidebar-container">
        <div className="sidebar-content" style={{ width: `${width}px`, transform }}>
          <ul className="menu">
            <li className="menu-item">
              <Link to="/">Home</Link>
            </li>
            <li className="menu-item">
              <Link to="/projects">Projects</Link>
            </li>
            <li className="menu-item">
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="sidebar-overlay" onClick={onSidebarClose} style={{ visibility }} />
      </div>
    );
  }
}

Sidebar.propTypes = {
  width: PropTypes.number,
  open: PropTypes.bool,
}

Sidebar.defaultProps = {
  width: 300,
  open: false,
}

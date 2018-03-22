/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

import "./Sidebar.css";

export default class Sidebar extends Component {

  render() {
    const { open, onSidebarClose } = this.props;
    const transform = open ? 'translateX(0)' : 'translateX(-100%)';
    return (
      <div className="sidebar-container" style={{ transform }}>
        <button className="close" onClick={onSidebarClose}>
          <i className="icons">&#xe802;</i>
        </button>
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
    );
  }
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  onSidebarClose: PropTypes.func
}

Sidebar.defaultProps = {
  open: false
}

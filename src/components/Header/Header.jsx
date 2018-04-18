/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component, Fragment } from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import classNames from "classnames";
import Sidebar from "../Sidebar/Sidebar";
import "./Header.css";

export default class Header extends Component {

  static propTypes = {
    color: PropTypes.string,
    background: PropTypes.string,
    project: PropTypes.object
  }

  static defaultProps = {
    color: 'rgba(0, 0, 0, .75)',
    background: '#fff'
  }

  state = {
    sidebarOpen: false,
    path: ''
  }

  componentDidMount() {
    const path = window.location.pathname;
    this.setState({ path });
  }

  onSidebarOpen = () => {
    this.setState({ sidebarOpen: true });
  }

  onSidebarClose = () => {
    this.setState({ sidebarOpen: false });
  }

  render() {
    const { color, background, project } = this.props;
    const { sidebarOpen, path } = this.state;
    const slug = `/${path.split('/').reverse()[0]}`;
    return (
      <div className="header" style={{ color, background }}>
        <nav className="header-links">
          {project &&
            <Fragment>
              <Link
                to={path}
                className={classNames({ "active": slug === `${project.id}` })}
                style={{ borderBottomColor: color }}
              >
                {project.title}
              </Link>
              <i className="icons">&#xe803;</i>
            </Fragment>
          }
          <div className="header-fixed-links">
            <Link
              to="/projects"
              className={classNames({ "active": path === "/projects" })}
              style={{ borderBottomColor: color }}
            >
              Projects
            </Link>
            <Link
              to="/about"
              className={classNames({ "active": path === "/about" })}
              style={{ borderBottomColor: color }}
            >
              About
            </Link>
          </div>
        </nav>
        <Link to="/" className="header-logo" style={{ color }}>GUMLAB</Link>
        <button className="header-bar" style={{ color }} onClick={this.onSidebarOpen}>
          <i className="icons">&#xf008;</i>
        </button>
        <Sidebar open={sidebarOpen} onSidebarClose={this.onSidebarClose} />
      </div>
    );
  }
}

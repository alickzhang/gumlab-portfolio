/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component } from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import classNames from "classnames";
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
    isTop: true
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const isTop = window.scrollY < window.innerHeight;
    if (isTop !== this.state.isTop) {
      this.setState({ isTop });
    }
  }

  render() {
    const { color, background, project } = this.props;
    const path = window.location.pathname;
    return (
      <div className="header" style={{ color, background }}>
        <nav className="header-links">
          {project &&
            <div className="header-links-project">
              <Link
                to={`/projects${project.id}`}
                className={classNames({ "active": path === `/projects${project.id}` })}
                style={{ borderBottomColor: color }}
              >
                {project.title}
              </Link>
              <span className="icon-arrow">&#xe802;</span>
            </div>
          }
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
        </nav>
      </div>
    );
  }
}

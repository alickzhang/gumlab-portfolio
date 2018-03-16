/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component } from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import "./Header.css";

export default class Header extends Component {

  static propTypes = {
    color: PropTypes.string,
    background: PropTypes.string
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
    const { color, background } = this.props;
    return (
      <div className="header" style={{ color, background }}>
        <nav className="header-links">
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    );
  }
}

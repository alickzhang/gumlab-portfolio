/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component } from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import "./Header.css";
import logo from "./images/logo.png";

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
    isTop: true,
    rotate: 0
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
    const rotate = `${window.scrollY / 10 % 360}deg`;
    this.setState({ rotate });
  }

  render() {
    const { color, background } = this.props;
    const { isTop, rotate } = this.state;
    return (
      <div className="header" style={{ color, background }}>
        <div className="header-brand" style={{ transform: `rotate(${rotate})` }}>
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        <nav className="header-links">
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
        </nav>
        {/*<div className={isTop ? "bars" : "bars dark"} onClick={this.props.onSidebarOpen}><i className="fa fa-bars" /></div>*/}
      </div>
    );
  }
}

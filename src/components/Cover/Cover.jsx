/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "gatsby-link";
import Img from "gatsby-image";
import scrollYTo from "../../shared/scrollBehaviour";
import "./Cover.css";

export default class Cover extends Component {

  static propTypes = {
    cover: PropTypes.object.isRequired,
    fadein: PropTypes.bool,
    fixed: PropTypes.bool,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    loading: PropTypes.bool,
    onLoad: PropTypes.func
  }

  static defaultProps = {
    fadein: false,
    fixed: false,
    title: '',
    titleColor: '#fff',
    loading: false,
    onLoad: () => {}
  }

  componentWillMount() {
    this.width = window.innerWidth;
  }

  render() {
    const { cover, fadein, fixed, title, titleColor, loading } = this.props;
    let sizes = null;
    if (cover && cover.childImageSharp) {
      ({ sizes } = cover.childImageSharp);
    }
    const coverClass = classNames('cover-img', { fadein, fixed });
    const showLogo = this.width > 480 || (this.width <= 480 && !title);
    return (
      <Fragment>
        <div className="cover">
          <div className="cover-img-container">
            <Img sizes={sizes} fadeIn={fadein} className={coverClass} onLoad={this.props.onLoad} />
          </div>
          {showLogo && <Link to="/" className="logo" style={{ color: titleColor }}>GUMLAB</Link>}
          {title && <div className="cover-title" style={{ color: titleColor }}>{title}</div>}
          <button className="down" onClick={() => scrollYTo(window.innerHeight)} style={{ color: titleColor }}>
            {loading ? <i className="icons loading">&#xf110;</i> : <i className="icons">&#xe800;</i>}
          </button>
        </div>
      </Fragment>
    );
  }
}

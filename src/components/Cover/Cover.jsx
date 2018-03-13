import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Img from "gatsby-image";
import scrollYTo from "../../shared/scrollBehaviour";
import "./Cover.css";

export default class Cover extends Component {

  static propTypes = {
    url: PropTypes.string,
    sizes: PropTypes.object,
    fadein: PropTypes.bool,
    fixed: PropTypes.bool,
    title: PropTypes.string,
    titleColor: PropTypes.string
  }

  static defaultProps = {
    fadein: false,
    fixed: false,
    titleColor: '#fff'
  }

  render() {
    const { url, sizes, fadein, fixed, title, titleColor } = this.props;
    const coverClass = classNames('cover-img', { fadein, fixed });
    return (
      <Fragment>
        <div className="cover">
          <div className="cover-img-container">
            {
              sizes
              ? <Img sizes={sizes} fadeIn={fadein} className={coverClass} />
              : <div className={coverClass} style={{ backgroundImage: `url(${url}` }} />
            }
          </div>
          {title && <div className="cover-title" style={{ color: titleColor }}>{title}</div>}
          <button className="down" onClick={() => scrollYTo(window.innerHeight)} style={{ color: titleColor }}>
            <i className="fa fa-arrow-down" />
          </button>
        </div>
      </Fragment>
    );
  }
}

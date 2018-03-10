import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Img from "gatsby-image";
import "./Cover.css";

export default class Cover extends Component {

  static propTypes = {
    url: PropTypes.string,
    sizes: PropTypes.object,
    fadein: PropTypes.bool,
    fixed: PropTypes.bool,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    fadein: false,
    fixed: false,
  }

  scrollDown = (e) => {
    e.stopPropagation();
    const element = document.getElementById("start");
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  render() {
    const { url, sizes, fadein, fixed, title } = this.props;
    const coverClass = classNames('cover-img', { fadein, fixed });
    return (
      <Fragment>
        <div className="cover">
          {
            sizes
            ? <Img sizes={sizes} fadeIn={fadein} className={coverClass} />
            : <div className={coverClass} style={{ backgroundImage: `url(${url}` }} />
          }
          {title && <div className="cover-title">{title}</div>}
          <button className="down" onClick={this.scrollDown}><i className="fa fa-chevron-down" /></button>
        </div>
        <div id="start" />
      </Fragment>
    );
  }
}

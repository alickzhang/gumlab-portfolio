import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Img from "gatsby-image";
import "./Cover.css";

const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  } else {
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
  }
};

export default class Cover extends Component {

  static propTypes = {
    url: PropTypes.string,
    sizes: PropTypes.object,
    fadein: PropTypes.bool,
    fixed: PropTypes.bool,
    title: PropTypes.string,
    titleColor: PropTypes.string,
  }

  static defaultProps = {
    fadein: false,
    fixed: false,
    titleColor: '#fff',
  }

  getCurrentScrollTop = () => {
    return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
  }

  scrollDown = () => {
    const scrollTop = this.getCurrentScrollTop();
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.setScrollTop(easeInOutCubic(time, scrollTop, window.innerHeight, 450));
      if (time < 450) {
        requestAnimationFrame(frameFunc);
      }
    };
    requestAnimationFrame(frameFunc);
  }

  setScrollTop(value) {
    document.body.scrollTop = value;
    document.documentElement.scrollTop = value;
  }

  render() {
    const { url, sizes, fadein, fixed, title, titleColor } = this.props;
    const coverClass = classNames('cover-img', { fadein, fixed });
    return (
      <Fragment>
        <div className="cover">
          {
            sizes
            ? <Img sizes={sizes} fadeIn={fadein} className={coverClass} />
            : <div className={coverClass} style={{ backgroundImage: `url(${url}` }} />
          }
          {title && <div className="cover-title" style={{ color: titleColor }}>{title}</div>}
          <button className="down" onClick={this.scrollDown} style={{ color: titleColor }}>
            <i className="fa fa-arrow-down" />
          </button>
        </div>
      </Fragment>
    );
  }
}

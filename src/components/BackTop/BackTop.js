import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./BackTop.css";

const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  } else {
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
  }
};

export default class BackTop extends Component {

  static propTypes = {
    color: PropTypes.string,
    top: PropTypes.number,
  }

  static defaultProps = {
    color: "rgba(0, 0, 0, .75)",
    top: window.innerHeight,
  }

  state = {
    visible: false,
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  getCurrentScrollTop = () => {
    return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
  }

  scrollToTop = () => {
    const { top } = this.props;
    const scrollTop = this.getCurrentScrollTop();
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.setScrollTop(easeInOutCubic(time, scrollTop, top, 450));
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

  onScroll = () => {
    if (window.scrollY > 1.6 * window.innerHeight) {
      this.setState({ visible: true });
    } else {
      this.setState({ visible: false });
    }
  }

  render() {
    const { color } = this.props;
    const { visible } = this.state;
    const btnClassName = classNames("back-top", { visible });
    return (
      <button className={btnClassName} onClick={this.scrollToTop} style={{ color: color }}>
        <i className="fa fa-arrow-up" />
      </button>
    );
  }
}

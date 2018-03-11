import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./BackTop.css";

export default class BackTop extends Component {

  static propTypes = {
    color: PropTypes.string,
  }

  static defaultProps = {
    color: "rgba(0, 0, 0, .75)",
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

  onScroll = () => {
    if (window.scrollY > 1.6 * window.innerHeight) {
      this.setState({ visible: true });
    } else {
      this.setState({ visible: false });
    }
  }

  backToTop = () => {
    const element = document.getElementById("start");
    element.scrollIntoView({ block: "start" });
  }

  render() {
    const { color } = this.props;
    const { visible } = this.state;
    const btnClassName = classNames("back-top", { visible });
    return (
      <button className={btnClassName} onClick={this.backToTop} style={{ color: color }}>
        <i className="fa fa-arrow-up" />
      </button>
    );
  }
}

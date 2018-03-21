import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import scrollYTo from "../../shared/scrollBehaviour";
import "./BackTop.css";

export default class BackTop extends Component {

  static propTypes = {
    color: PropTypes.string,
    top: PropTypes.number
  }

  static defaultProps = {
    color: "rgba(0, 0, 0, .75)",
    top: undefined
  }

  state = {
    visible: false
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

  render() {
    const { color, top } = this.props;
    const { visible } = this.state;
    const btnClassName = classNames("back-top", { visible });
    return (
      <button className={btnClassName} onClick={() => scrollYTo(top || window.innerHeight)} style={{ color }}>
        <span className="icon-arrow">&#xe801;</span>
      </button>
    );
  }
}

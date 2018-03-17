/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Img from "gatsby-image";

import "./Feature.css";

export default class Feature extends Component {

  static propTypes = {
    title: PropTypes.string,
    images: PropTypes.array,
    path: PropTypes.string,
    defaultSpeed: PropTypes.number
  }

  static defaultProps = {
    defaultSpeed: 1
  }

  state = {
    speed: 1
  }

  componentDidMount() {
    this.animationRequest = window.requestAnimationFrame(this.scroll);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationRequest);
  }

  onMouseOut = (e) => {
    e.stopPropagation();
    const { defaultSpeed } = this.props;
    const { speed } = this.state;
    this.setState({ speed: speed > 0 ? defaultSpeed : -defaultSpeed });
  }

  hover = (e) => {
    e.stopPropagation();
    const offsetX = e.clientX - window.innerWidth / 2;
    const speed = 20 * offsetX / window.screen.width;
    this.setState({ speed });
  }

  scroll = () => {
    const { speed } = this.state;
    if (speed < 0) {
      if (this.feature.scrollLeft === 0) {
        this.feature.scrollLeft = this.feature.scrollWidth / 3;
      } else {
        this.feature.scrollLeft += speed;
      }
    } else if (this.feature.scrollLeft >= this.feature.scrollWidth / 3) {
      this.feature.scrollLeft = 0;
    } else {
      this.feature.scrollLeft += speed;
    }
    this.animationRequest = window.requestAnimationFrame(this.scroll);
  }

  render() {
    const { title, images, path } = this.props;
    const featureEl = (
      <Fragment>
        <div className="feature-text">
          <div className="title"><p>{title}</p></div>
          <span className="link">Read More</span>
        </div>
        {images.map(item => (
          <figure key={item.childImageSharp.sizes.src} className="feature-img">
            <Img sizes={item.childImageSharp.sizes} />
          </figure>)
        )}
      </Fragment>
    );

    return (
      <div
        onMouseMove={this.hover}
        onMouseOut={this.onMouseOut}
        ref={feature => { this.feature = feature; }}
        className="feature"
      >
        <Link to={path} className="feature-wrapper">
          {featureEl}
          {featureEl}
          {featureEl}
        </Link>
      </div>
    );
  }
}

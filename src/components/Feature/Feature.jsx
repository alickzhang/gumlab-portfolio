import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

import "./Feature.css";

export default class Feature extends Component {

  static propTypes = {
    title: PropTypes.string,
    images: PropTypes.array,
    path: PropTypes.string,
  }

  state = {
    animationRequest: null,
    defaultSpeed: 1,
    speed: 1,
  }

  componentDidMount() {
    this.setState({
      animationRequest: window.requestAnimationFrame(this.scroll),
    });
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.state.animationRequest);
  }

  scroll = () => {
    const { speed } = this.state;
    if (speed < 0) {
      if (this.feature.scrollLeft === 0) {
        this.feature.scrollLeft = this.feature.scrollWidth / 3;
      } else {
        this.feature.scrollLeft += speed;
      }
    } else {
      if (this.feature.scrollLeft >= this.feature.scrollWidth / 3) {
        this.feature.scrollLeft = 0;
      } else {
        this.feature.scrollLeft += speed;
      }
    }
    this.setState({
      animationRequest: window.requestAnimationFrame(this.scroll),
    });
  }

  hover = (e) => {
    e.stopPropagation();
    const offsetX = e.clientX - window.innerWidth / 2;
    const speed = 20 * offsetX / window.screen.width;
    this.setState({ speed });
  }

  onMouseOut = (e) => {
    e.stopPropagation();
    const { speed, defaultSpeed } = this.state;
    this.setState({ speed: speed > 0 ? defaultSpeed : -defaultSpeed });
  }

  render() {
    const { title, images, path } = this.props;
    const featureEl = (
      <Fragment>
        <div className="feature-text">
          <div className="title">{title}</div>
          <span className="link">Read More</span>
        </div>
        {images.map(item =>
          <figure key={item.childImageSharp.sizes.src} className="feature-img">
            <img srcSet={item.childImageSharp.sizes.srcSet} alt={title} />
          </figure>
        )}
      </Fragment>
    );

    return (
      <div
        onMouseMove={this.hover}
        onMouseOut={this.onMouseOut}
        ref={input => { this.feature = input; }}
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

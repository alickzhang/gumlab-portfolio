import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from "gatsby-link";

import './index.css';

export default class Feature extends Component {

  static propTypes = {
    title: PropTypes.string,
    pictures: PropTypes.array,
    path: PropTypes.string,
  }

  state = {
    defaultSpeed: 1,
    speed: 1,
  }

  componentDidMount() {
    window.requestAnimationFrame(this.scroll);
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
    window.requestAnimationFrame(this.scroll);
  }

  hover = (e) => {
    e.stopPropagation();
    const halfWidth = window.innerWidth / 2;
    const offsetX = e.clientX - halfWidth;
    const speed = 10 * offsetX / halfWidth;
    this.setState({ speed });
  }

  onMouseOut = (e) => {
    e.stopPropagation();
    const { speed, defaultSpeed } = this.state;
    this.setState({ speed: speed > 0 ? defaultSpeed : -defaultSpeed });
  }

  render() {
    const { title, pictures, path } = this.props;
    const featureEl = (
      <Fragment>
        <div className="feature-text">
          <div className="title">{title}</div>
          <span className="link">Read More</span>
        </div>
        {pictures.map(item =>
          <figure key={item} className="feature-img">
            <img src={item} alt={title} />
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

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

export default class Cover extends Component {

  static propTypes = {
    coverImg: PropTypes.string.isRequired,
    fadein: PropTypes.bool,
    fixed: PropTypes.bool,
    title: PropTypes.string,
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
    const { coverImg, fadein, fixed, title } = this.props;
    const coverClass = classNames('cover-img', { fadein: fadein, fixed: fixed });
    return (
      <Fragment>
        <div className="cover">
          <div className={coverClass} style={{ backgroundImage: `url(${coverImg}` }} />
          {title && <div className="cover-title">{title}</div>}
          <div className="down" onClick={this.scrollDown}><i className="fa fa-chevron-down" /></div>
        </div>
        <div id="start" />
      </Fragment>
    );
  }
}

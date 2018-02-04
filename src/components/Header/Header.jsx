import React, { Component } from 'react';
import Link from 'gatsby-link';
import './Header.css';

export default class Header extends Component {

  state = {
    isTop: true,
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < window.innerHeight;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop });
      }
    });
  }

  render() {
    const { isTop } = this.state;
    return (
      <div className="header">
        <div className={isTop ? "bars" : "bars dark"} onClick={this.props.onSidebarOpen}><i className="fa fa-bars" /></div>
        <div className="logo"><Link to="/">Logo</Link></div>
      </div>
    );
  }
}

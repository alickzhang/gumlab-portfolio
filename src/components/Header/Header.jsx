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
        <h1 className="header-brand"><Link to="/">Gumlab</Link></h1>
        <nav className="header-links">
          <Link to="/projects">Projects</Link>
          <Link to="/">Studios</Link>
          <Link to="/about">Infos</Link>
          <a>cn</a>
        </nav>
        {false && <div className={isTop ? "bars" : "bars dark"} onClick={this.props.onSidebarOpen}><i className="fa fa-bars" /></div>}
      </div>
    );
  }
}

import React, { Component } from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";

class NotFoundPage extends Component {
  render() {
    return (
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />
        <h1>404 NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    );
  }
}

export default NotFoundPage;

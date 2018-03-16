import React, { Component } from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <Helmet title={`Page not found | ${config.siteTitle}`} />
        <div style={{ textAlign: 'center' }}>
          <h1>404 NOT FOUND</h1>
          <p>We can&#39;t find the page you are looking for.</p>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;

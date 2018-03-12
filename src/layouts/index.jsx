import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import "./index.css";

export default class MainLayout extends React.Component {

  state = {
    sidebarOpen: false,
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      window.scroll(0, 0);
    }
  }

  getLocalTitle() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, "")
      .replace("/", "");
    let title = "";
    if (currentPath === "") {
      title = "Home";
    } else if (currentPath === "tags/") {
      title = "Tags";
    } else if (currentPath === "categories/") {
      title = "Categories";
    } else if (currentPath === "about/") {
      title = "About";
    } else if (currentPath.indexOf("tags/")) {
      const tag = currentPath
        .replace("tags/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `Tagged in ${capitalize(tag)}`;
    } else if (currentPath.indexOf("categories/")) {
      const category = currentPath
        .replace("categories/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `${capitalize(category)}`;
    }
    return title;
  }

  onSidebarOpen = () => {
    this.setState({ sidebarOpen: true });
  }

  onSidebarClose = () => {
    this.setState({ sidebarOpen: false });
  }

  render() {
    const { children } = this.props;
    const { sidebarOpen } = this.state;
    return (
      <div>
        <Helmet>
          <title>{`${config.siteTitle} |  ${this.getLocalTitle()}`}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Header onSidebarOpen={this.onSidebarOpen} />
        <Sidebar open={sidebarOpen} onSidebarClose={this.onSidebarClose} />
        {children()}
      </div>
    );
  }
}

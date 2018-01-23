import React, { Component } from "react";
import ReactDisqusComments from "react-disqus-comments";
import config from "../../../data/SiteConfig";

class Disqus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: []
    };
    this.notifyAboutComment = this.notifyAboutComment.bind(this);
    this.onSnackbarDismiss = this.onSnackbarDismiss.bind(this);
  }

  onSnackbarDismiss() {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }
  notifyAboutComment() {
    const toasts = this.state.toasts.slice();
    toasts.push({ text: "New comment available!" });
    this.setState({ toasts });
  }
  render() {
    const { projectNode } = this.props;
    if (!config.disqusShortname) {
      return null;
    }
    const project = projectNode.frontmatter;
    const url = config.siteUrl + config.pathPrefix + projectNode.fields.slug;
    return (
      <ReactDisqusComments
        shortname={config.disqusShortname}
        identifier={project.title}
        title={project.title}
        url={url}
        category_id={project.category_id}
        onNewComment={this.notifyAboutComment}
      />
    );
  }
}

export default Disqus;

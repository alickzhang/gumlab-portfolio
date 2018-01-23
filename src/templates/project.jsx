import React from "react";
import Helmet from "react-helmet";
import UserInfo from "../components/UserInfo/UserInfo";
import ProjectTags from "../components/ProjectTags/ProjectTags";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";
import "./project.css";

export default class ProjectTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext;
    const projectNode = this.props.data.markdownRemark;
    const project = projectNode.frontmatter;
    if (!project.id) {
      project.id = slug;
    }
    if (!project.category_id) {
      project.category_id = config.projectDefaultCategoryID;
    }
    return (
      <div>
        <Helmet>
          <title>{`${project.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO projectPath={slug} projectNode={projectNode} projectSEO />
        <div>
          <h1>{project.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: projectNode.html }} />
          <div className="project-meta">
            <ProjectTags tags={project.tags} />
            <SocialLinks projectPath={slug} projectNode={projectNode} />
          </div>
          <UserInfo config={config} />
        </div>
      </div>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        slug
      }
    }
  }
`;
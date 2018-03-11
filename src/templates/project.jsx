import React from "react";
import Helmet from "react-helmet";
import ProjectTags from "../components/ProjectTags/ProjectTags";
import SEO from "../components/SEO/SEO";
import Header from "../components/Header/Header";
import Cover from "../components/Cover/Cover";
import Footer from "../components/Footer/Footer";
import config from "../../data/SiteConfig";

import "./project.css";

export default class ProjectTemplate extends React.Component {

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
    const elements = document.getElementsByClassName('project-content')[0].childNodes;
    elements.forEach(el => {
      /* eslint no-param-reassign: "off" */
      el.className = "project-section"
    });
    this.elements = elements || [];
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      window.scroll(0, 0);
    }
    this.elements.forEach(el => {
      if (!el.classList) {
        return;
      }
      if (el.offsetTop < window.innerHeight + window.scrollY - 150) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  }

  scrollDown = () => {
    const element = document.getElementById("start");
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  render() {
    const { slug } = this.props.pathContext;
    const projectNode = this.props.data.markdownRemark;
    const project = projectNode.frontmatter;
    let coverSizes = null;
    if (project.cover && project.cover.childImageSharp) {
      coverSizes = project.cover.childImageSharp.sizes;
    }
    const coverUrl = !coverSizes ? project.cover : null;
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
        <Cover url={coverUrl} sizes={coverSizes} fadein fixed title={project.title} />
        <Header color={project.color} background={project.background} />
        <div className="project-container" style={{ color: project.color, background: project.background }}>
          <div className="project-content" dangerouslySetInnerHTML={{ __html: projectNode.html }} />
          <div className="project-meta">
            <ProjectTags tags={project.tags} />
          </div>
        </div>
        <Footer config={config} />
        <Cover url={coverUrl} sizes={coverSizes} fixed title={project.title} />
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ProjectBySlugAndAudience($slug: String!, $audience: String!) {
    markdownRemark(fields: { slug: { eq: $slug }, audience: { eq: $audience } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover {
          childImageSharp {
            sizes(maxWidth: 1600, quality: 95) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        date
        category
        tags
        color
        background
      }
      fields {
        slug
      }
    }
  }
`;

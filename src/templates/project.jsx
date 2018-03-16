import React, { Component } from "react";
import Helmet from "react-helmet";
import ProjectTags from "../components/ProjectTags/ProjectTags";
import SEO from "../components/SEO/SEO";
import Header from "../components/Header/Header";
import Cover from "../components/Cover/Cover";
import Footer from "../components/Footer/Footer";
import BackTop from "../components/BackTop/BackTop";
import config from "../../data/SiteConfig";

import "./project.css";

export default class ProjectTemplate extends Component {

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

  render() {
    const { slug } = this.props.pathContext;
    const projectNode = this.props.data.markdownRemark;
    const project = projectNode.frontmatter;
    const { cover } = project;
    if (!project.id) {
      project.id = slug;
    }
    return (
      <div>
        <Helmet>
          <title>{`${project.title} by Gumlab`}</title>
        </Helmet>
        <SEO projectPath={slug} projectNode={projectNode} projectSEO />
        <Cover cover={cover} fadein fixed title={project.title} titleColor={project.titleColor} />
        <Header color={project.color} background={project.background} />
        <div className="project-container" style={{ color: project.color, background: project.background }}>
          <div className="project-content" dangerouslySetInnerHTML={{ __html: projectNode.html }} />
          <div className="project-meta">
            <ProjectTags tags={project.tags} />
          </div>
        </div>
        <Footer config={config} />
        <Cover cover={cover} fixed title={project.title} titleColor={project.titleColor} />
        <BackTop color={project.color} />
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
        tags
        color
        background
        titleColor
      }
      fields {
        slug
      }
    }
  }
`;

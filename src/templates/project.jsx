import React from "react";
import Helmet from "react-helmet";

import UserInfo from "../components/UserInfo/UserInfo";
import ProjectTags from "../components/ProjectTags/ProjectTags";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import Cover from "../components/Cover/Cover";
import Footer from "../components/Footer/Footer";
import config from "../../data/SiteConfig";

import "./b16-tomorrow-dark.css";
import "./project.css";

export default class ProjectTemplate extends React.Component {

  state = {
    elements: null
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
    const project = this.props.data.markdownRemark.frontmatter;
    const elements = document.getElementsByClassName('project-content')[0].childNodes;
    elements.forEach(el => {
      el.className="project-section";
      el.style=`color: ${project.color}`;
    });
    this.setState({ elements });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const { elements } = this.state;
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      window.scroll(0, 0);
    }
    elements.forEach(el => {
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
    const coverSrc = project.cover ? project.cover.childImageSharp.sizes.src : '';
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
        <Cover coverImg={coverSrc} fadein fixed title={project.title} />
        <div className="project-container" style={{ color: project.color, background: project.background }}>
          <div className="project-content" dangerouslySetInnerHTML={{ __html: projectNode.html }} />
          <div className="project-meta" style={{ color: project.color, background: project.background }}>
            <ProjectTags tags={project.tags} />
          </div>
        </div>
        <Footer config={config} />
        <Cover coverImg={coverSrc} fixed title={project.title} />
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
          childImageSharp{
            sizes {
              ...GatsbyImageSharpSizes
            }
          }
        }
        date
        category
        tags
        color
        background
        featuredImages {
          childImageSharp {
            sizes {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;

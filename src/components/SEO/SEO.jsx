import React, { Component } from "react";
import Helmet from "react-helmet";
import config from "../../../data/SiteConfig";

class SEO extends Component {
  render() {
    const { projectNode, projectPath, projectSEO } = this.props;
    let title;
    let description;
    let image;
    let projectURL;
    if (projectSEO) {
      const projectMeta = projectNode.frontmatter;
      ({ title } = projectMeta);
      description = projectMeta.description
        ? projectMeta.description
        : projectNode.excerpt;
      image = projectMeta.cover.childImageSharp.sizes.src;
      projectURL = `${config.siteUrl}/projects${projectPath}`;
    } else {
      title = config.siteTitle;
      description = config.siteDescription;
      image = config.siteLogo;
    }
    image = `${config.siteUrl}${image}`;
    const portfolioURL = config.siteUrl;
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: portfolioURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : ""
      }
    ];
    if (projectSEO) {
      schemaOrgJSONLD.push([
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": projectURL,
                name: title,
                image
              }
            }
          ]
        },
        {
          "@context": "http://schema.org",
          "@type": "CreativeWork",
          url: portfolioURL,
          name: title,
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
          headline: title,
          thumbnailUrl: image,
          description
        }
      ]);
    }
    return (
      <Helmet>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={projectSEO ? projectURL : portfolioURL} />
        {projectSEO ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={config.userTwitter ? config.userTwitter : ""}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
  }
}

export default SEO;

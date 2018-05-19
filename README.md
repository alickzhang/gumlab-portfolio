# Gumlab Portfolio Website

Gumlab is a Shanghai-based motion and animation studio.

## Prerequisites

The following tools are required:

- Yarn: Please follow the official installation instruction: https://yarnpkg.com/en/docs/install

- Gatsby-Cli: `gatsby-cli` is used to parse and build the website. Once Yarn is installed, you can install `gatsby-cli` by running:

```
yarn global add gatsby-cli
```

## Add/Edit projects

Project posts are stored in `/content/projects` folder. In each project folder, it's recommended to create an `assets` folder for images and an `index.md` for the post itself. Project posts are written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) syntax, which will be parsed by `gatsby-cli` and converted to web pages.

When adding or editing project posts, you can create an optional `index-cn.md` for contents targeting visits from mainland China.

For each project post, you can specify the following meta tags:

- title: The project title.
- cover: Relative path to the cover image. _e.g._ `./assets/cover.jpg`.
- category: Reserved for future use.
- date: The project date, which will affect project ordering on home page.
- featured: If `true`, the project will be featured on home page.
- color: Text color on project detail page.
- background: Background color on project detail page.
- titleColor: Title color on project detail page.
- tags: A list of tags describing the project.
- featuredImages: An array of relative paths. The listed images will be used in the corresponding project carousel on home page.

### Preview

Run the following command to start the website on your local machine:

```
gatsby develop
```

The website will be previewable at `http://localhost:8000`.

## Deployment

Run the following command to build the website for production:

```
gatsby build
```
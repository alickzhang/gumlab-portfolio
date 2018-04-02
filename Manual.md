# User Manual

## Prerequisites

The following tools are required:

- Yarn: Please follow the offcial installation instruction: https://yarnpkg.com/en/docs/install

- Gatsby-Cli: `gatsby-cli` is used to parse and build the website. Once Yarn is installed, you can install `gatsby-cli` by running:

```
yarn global add gatsby-cli
```

## Add/Edit projects

Project posts are stored in `/content/projects` folder. In each project folder, it's recommended to create an `assets` folder to hold images, and an `index.md` file for the post itself. Project posts are written in Markdown syntax, which will be parsed by `gatsby-cli` and converted to web pages. Styles are predefined, so while adding/editing posts you won't need to specify styles at all. Please refer to the attached Markdown cheatsheet for syntax details.

The website is built to target users from both mainland China and the rest of the world. When adding or editing, create a file with `-cn` suffix for contents targeting mainland China. Netlify DNS will use GeoIP to redirect users from mainland China to the correct content page.

For each project post, you can specify the following meta tags:

- title: The project title.
- cover: Relative path to the cover image.
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

<br />

## Deployment

Run the following command to build the website for production:

```
gatsby build
```

The production version of the website will be built at `/public`. To deploy, log into [Netlify](https://app.netlify.com/), select `www.gum-lab.com`, then `Deploys` tab. Drag and drop the `public` folder into the dropping area at the bottom.
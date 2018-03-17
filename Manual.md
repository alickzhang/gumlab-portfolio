# User Manual

## Prerequisite

To build the website, the following tools are required:

- Yarn: Please follow the offcial installation instruction: https://yarnpkg.com/en/docs/install

- Gatsby-Cli: `gatsby-cli` is used to parse and build the website. Once Yarn is installed, you can install `gatsby-cli` by running:

```
yarn global add gatsby-cli
```

## Add/Edit projects

Project posts are written in Markdown, which will be parsed by `Gatsby`. Styles in for Markdown elements are predefined, so while editing post the user won't need to specify styles at all. Please refer to the attached Markdown cheatsheet for syntax.

The website is built to target users from both mainland China and the rest of the world. When adding or editing, create a file with `-cn` suffix for contents targeting mainland China. Netlify DNS will use GeoIP to redirect users from mainland China to the correct content page.

### Folder structure

### Preview

## Deployment
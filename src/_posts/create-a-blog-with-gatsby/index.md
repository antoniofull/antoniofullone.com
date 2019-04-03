---
path: '/blog/build-a-blog-with-gatsby'
layout: post
title: 'Build a blog with React and Gatsby'
date: 2019-03-07 19:40:00
category: coding
image: 'https://www.antoniofullone.com/images/posts/off-canvas.png'
imageDesc: 'Gatsby blog with React'
introduction: 'Building a blog with Gatsby and React'
status: 'draft'
---

For the new version of this website and the blog, I decided to use React. After playing with different tools I decided to use Gatbsy. I also want to blog more and stick to the markdown system that I have already in place with [Jekyll]() so the move to Gatsby was easier.

## So what is Gatsby?

Gatbsy is a static generator built on top of [React]() and [Grapqhl](). You can use it basically for everything, from building a blog using headless CMS Api (like Wordpress), to markdown or simple html files. It has a very good support, a good [documentation]() (but it could be improved) and has a very active community and also a very good plugin eco-system.

Table of Contents:

1. [Pros and Cons of Gatsby]()
2. [Install Gatbsy](#)
3. [Folder Structure](#)
4. [Setup Gatbsy Project](#)
5. [Install Gatbsy](#)
6. [Install Gatbsy](#)
7. [Install Gatbsy](#)
8. [Install Gatbsy](#)
9. [Issues F.A.Q.](#)

## Pros and Cons of Gatsby

Before diving into the installation let's look at what are the pros and cons of using Gatsby. If you already have decided you can [skip]() to the next section. has Gatsby is built on top of React and Graphql you need some experience with it. Grapql has a very good documentation and, if you are planning to use Gatsby, I assume you already know React.

### Pros

1. **Bundling**. No need to spend time on configuring your webpack files. Simply run `gatsby develop` or `gatsby build` and that's it.
2. **Security**. No databases, no danger. Gatbsy renders plan html.
3. **Performance**. All the advantages of using static html plus: Prefetch linked pages, progressive images loading, and many other [features]()
4. **Inline critical CSS** out of the box. Gatsby takes care of it.
5. **PWA**. Offline access via service workers.
6. **Good plugins eco-system**. While their eco-system is not massive like other CMS's, Gatbsy has a lot of [plugin]() and is very easy to install them.
7. SSR. Server side rendering.
8. Read data basically from anywhere. CMS, Markdown, API, JSON, CSV.

### Cons

1. It requires a build every time you write a new post or you want to update the site/app. (It can be automated with Netlify or other services)
2. It requires technical knowledge(React, Javascript, git, node) and, for writers, at least they must know markdown. If you have a multi-author blog, with non technical writes, it might not be the right choice.
3. The community is growing and the plugins eco-system is pretty good, but it still a very small percentage compared to, for example, the Worpress community. Anyway I saw on twitter that some people are working also on porting wordpress themes to Gatsby, which is a good sign.
4. I can't see, for now, a wild adoption of Gatsby outside of the webdev/Js community. See point 2.

Gatbsy is a good solution if you are a single blogger or a dev, but it is not accessible to everyone like Wordpress or Drupal are. That's because Gatsby it is not a CMS, its purpose is to gives you static html. And it does this very well.Once hooked up to a service like Netlify you can sync it with your repo and automate the build.

## Install Gatbsy

The first step is to install the Gatsby-Cli. If you have [npx]() installed, I suggest you to use it otherwise you can install it with `npm i gatbsy-cli -g`. The `-g` flag will install it globally. Once installed the next step is to init the project. You can do this with `gatbsy new my-blog` where my-blog . It will clone the gatsby starter repo in a folder called my-blog(you can call it whatever you want) and install all the dependencies. Once finished `cd my-blog` and then run `gatsby develop` to start the local server. At this point, if everything worked fine you should have the server running at [`localhost:8000`]() and you should see a page like this ![img](). The folder structure should be something like this image:
![img]()
One thing that I like to do is to us always the same script so I go to the `package.json` and change the 2 scripts in `gatsby develop` => `yarn start` and `gatsby build` => `yarn build`. I do this because I use aliases, but this is an entirely optional step, not needed.

## Folder Structure and Gatsby Files

All the source code for the blog will be stored in the `./src` folder. In the root folder there are 4 main files [`gatsby-config.js`]() [`gatsby-node.js`]() [`gatsby-browser.js`](https://www.gatsbyjs.org/docs/browser-apis/) [`gatsby-ssr`](). We are going to use the first 2 files, config and node, and skip the last 2. I won't spend much time on explaining the API, as are relatively easy, but both [browser]() and [ssr]() API are straitforward.
The `gatsby-config` file is where we put all the settings for the blog and we load the plugins, while the node api will be used for create the pages and posts.

## Install plugins and add meta data

Open the gatsy-config.js file, you should have this code

```javascript
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ]
};
```

The file is exporting an object and an array. Let's change the `siteMetadata` add our blog's info's.

```javascript
siteMetadata: {
    title: `My personal Blog`,
    description: `Personal blog of Antonio Fullone`,
    author: `Antonio Fullone`,
    siteUrl: 'https://www.antoniofullone.com'
  },
```

By default Gatsby adds also [react-helmet](). We will be use it later to add meta data to our post page. Then we have some other essential plugins for managing files and images. If you want your website to be also a PWA, then you can un-comment this part

```javascript
// this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
```

At this point you will need to install the plugin, simply run `yarn add gatsby-plugin-offline` or `npm i gatsby-plugin-offline` to install the plugin, then restart the server. I'll leave this commented for now. Let's now add the other plugins:
`yarn add gatsby-transformer-remark gatsby-plugin-catch-links gatsby-plugin-sitemap gatsby-plugin-favicon gatsby-remark-images gatsby-plugin-feed` then we add them to the config file:

```javascript
`gatsby-plugin-catch-links`,
  `gatsby-plugin-sitemap`,
  `gatsby-plugin-favicon`,
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      // CommonMark mode (default: true)
      commonmark: true,
      // Footnotes mode (default: true)
      footnotes: true,
      // Pedantic mode (default: true)
      pedantic: true,
      // GitHub Flavored Markdown mode (default: true)
      gfm: true,
      // Plugins configs
      plugins: []
    }
  },
  {
    resolve: `gatsby-remark-images`,
    options: {
      // It's important to specify the maxWidth (in pixels) of
      // the content container as this plugin uses this as the
      // base for generating different widths of each image.
      maxWidth: 700
    }
  },
  {
    resolve: `gatsby-plugin-feed`
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/src/_posts/`,
      name: 'blog'
    }
  };
```

Now it should be like this:

```javascript
module.exports = {
  siteMetadata: {
    title: 'Antonio Fullone Personal Website',
    description:
      'Personal Website of Antonio Fullone, Designer &amp; Developer, wannabe cook',
    siteUrl: 'https://www.antoniofullone.com',
    author: `Antonio Fullone`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-favicon`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: []
      }
    },
    {
      resolve: `gatsby-remark-images`,
      options: {
        // It's important to specify the maxWidth (in pixels) of
        // the content container as this plugin uses this as the
        // base for generating different widths of each image.
        maxWidth: 700
      }
    },
    {
      resolve: `gatsby-plugin-feed`
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/_posts/`,
        name: 'blog'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
        name: 'data'
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ]
};
```

Adding plugins is easy as just add them to the array, if the plugin has some options you can then resolve and pass the options. You will notice that I added twice the source-file plugins, you can use a different name. The first one, added by default by Gatsby, is for managing images. I added the path to the folder where we will store our posts, `_posts`. As we use Markdown we need the plugin to handle it, `gatsby-transformer-remark` (the default options are ok), then we add also some plugins for creating an rss feed, add favicons and sitemap. The `gatsby-remark-images` is a plugin that will process the images from markdown making them responsive and adds also a nice `blur` effect, in medium style. The catch link plugins does the same for links, converting them in [Gatsby Links](). Ok so, last thing is just to create a new `_post` folder, where we will add our blog posts.

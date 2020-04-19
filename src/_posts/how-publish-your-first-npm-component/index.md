---
path: '/blog/how-publish-your-first-npm-package'
layout: post
title: 'How to publish your first NPM Package'
date: 2020-04-19
category: code
introduction: 'How to publish your first react component to NPM'
status: 'published'
---

Some time ago I created my [first npm package](https://www.npmjs.com/package/react-fluid-text). I am not really an open source person since I never had much time to get involved, but once I built this small component for my website I decided to publish it, and in the process I learned a bit about **building and publishing a package to NPM**.

In this post I will focus on React. We will build a React component with a basic template and we will publish it to NPM.
The source code is available on [Github](https://github.com/antoniofull/npm-package-react-template) and in the [NPM registry](https://www.npmjs.com/package/npm-package-react-template)

Let's not waste any more time and let's get started with coding.

We start creating the folder

```node
mkdir npm-react-template-package
cd npm-react-template-package
git init
yarn init -y
```

These steps should be familiar to all, we just create the folder and we initialize Git and Yarn so now our folder contains the package.json file. Change the `main: index.js` to `lib/index.js` so we have a little bit more of order in
Let's add the licence and keywords too.

```NODE
"keywords": [
    "reactjs, template"
  ],
  "license": "MIT",
```

You can modify your package.json file with your data. Next let's add the .gitignore file, we can use the one from [Github](https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore). Create your `.gitignore` file in the root folder and copy and paste the raw code.

Now it's time to add some dependencies

```NODE
yarn add @babel/core @babel/preset-env @babel/preset-react babel-cli babel-loader webpack webpack-cli react react-dom prop-types -D
```

We will use webpack and babel to transpile the code. For babel to work we need to create a file called `.babelrc` so let's create it and add

````NODE
{
  "presets": ["@babel/preset-react", "@babel/preset-env"]
}

```NODE
I guess this doesn't need any extra explanation. Now right before the devDependencies we add the peerDependencies.

```NODE
"peerDependencies": {
    "prop-types": "^15.7.2",
    "react": "^16.10.1",
    "react-dom": "^16.10.1"
 }

````

PeerDependencies are dependencies that are not installed automatically when running npm install, but are required by the code that will use the package. [Flavio does a great job ( as usual, you should follow him) explaining what peerDependencies are](https://flaviocopes.com/npm-peer-dependencies/). So if you are curious go and check it out.

Before starting to create our component we need the last thing, we need the script in package.json to build the code. Before the peerDependencies let's add our build script.

```NODE
 "scripts": {
    "build": "rm -rf lib && webpack"
 }
```

Let's now add our first file. We need a classic `webpack.config.js` file so let's create one and let's add the code.

```JS
var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'react',
    'react-dom': 'reactDOM',
    'prop-types': 'prop-types'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

```

If you work with React you have probably also worked with webpack so not much new, the only confusing part might be the `externals`. [Externals](https://webpack.js.org/configuration/externals/) are used in webpack when we want to exclude those files from the build. Since we do not want to ship our package with React and prop-types we tell webpack to exclude it. The rest is pretty simple and basic webpack configuration.

### Time to create and publish our first NPM component!

So we are ready to go and now we can create our custom component. Let's add a `src` folder and inside we create a file called `index.js`.

Our component will be very simple, just a classic Hello World! so let's add it

```JS
import React from 'react'

export default () => <h1>Hello World!</h1>

```

Let's now run the build command: `yarn build` if everything worked fine, now we have our component ready to be used inside the `lib`.

Before testing it our component works, let's add a quick test. I won't go much in details, maybe another time, I will be using testing library for React and Jest so let's add them

```NODE
yarn add @testing-library/react jest  -D
```

Now we create a folder called `__tests__` and we add our `MyComponent.test.js`. Open the newly created file and let's add a simple test

```JS
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import MyComponent from '../src'

afterEach(cleanup)

describe('<MyComponent>', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<MyComponent />)
    expect(asFragment()).toMatchSnapshot()
  })
})

```

Run `yarn jest` and check that everything is fine and the test passes, writing the snapshot inside its own folder. We then add the test command to package.json

```NODE
 "test": "yarn jest"
```

We are good to go. Now for testing the component we could use `npm link` but for make things easier I will just import the component from the lib folder, this is because we will ad an example folder direcly in our repo.

Let's create a folder called example and let's follow these steps

```NODE
yarn init -y
yarn add react react-dom
yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader html-webpack-plugin webpack webpack-cli webpack-dev-server -D
```

Let's add the scripts to the package.json

```NODE
  "scripts": {
    "build": "webpack",
    "start": "webpack-dev-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  }

```

Then the webpack.config.js

```JS
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
```

Now we add the index.html file used by webpack to start the server and the basic App.jsx

Index.html

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>React Template NPM Component</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

App.jsx

```JS
import React from 'react'
import MyNPMComponent from '../../lib'

const App = () => {
  return <MyNPMComponent />
}
export default App

```

We import the component direcly from the lib folder, but as I said you could also use `npm link` anyway now if you run `yarn start` and we open our browser to `localhost:8080` we should see our component loaded and the Hello World! text shown.

### Publish the component to npm

In order to publish the component we need to have an account to the [NPM website](https://www.npmjs.com/), if you don't have one just go and create it.

Then run `npm login` in your terminal, so you can login. Once loggedin you should see something like this

```NODE
Logged in as antoniofull on https://registry.npmjs.org/.
```

Next step is to choose a name for our package, I'll call it `npm-package-react-template` and, the most important part, we need to add the version. We can also add a short description and the README file.

[Here is my final package.json](https://github.com/antoniofull/npm-package-react-template/blob/master/package.json) and the [README](https://github.com/antoniofull/npm-package-react-template/blob/master/README.md)

Before hitting the publish button we need a last thing: we want to ignore some files from NPM so we need to add an `.npmignore` file, here is:

```NODE
.babelrc
webpack.config.js
yarn.lock
.DS_Store
src/.DS_Store
example/node_modules
```

Once done we can finally publish it with `npm publish`. If everything worked correctly you should see in the terminal the succesfully response and, usually, you should receive an email from NPM. If not, check the error, the most common error are:

- Some typos in your package.json o
- No version
- Name of the package already taken.

Fix the errors and then hit the button again, you should be ready to go.
Here is my [final result](https://www.npmjs.com/package/npm-package-react-template)

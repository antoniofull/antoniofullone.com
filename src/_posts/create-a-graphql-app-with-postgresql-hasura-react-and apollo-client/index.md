---
path: '/blog/graphql-app-hasura-postgresql-apollo-react'
layout: post
title: 'Create a GraphQl app with PostgreSQL, Hasura, React and Apollo client.'
date: 2020-04-26
category: code
introduction: 'How to create an app with GraphQl and PostgreSQL as backend and  React and Apollo client for front end'
status: 'published'
---

I am having quite a lot of fun recently working with GraphQl in some personal projects. I am understanding the real advantages of using it and, more important, the fact that finally I can focus 100% on the Front End without caring too much about the backend part (yep, I am not a fullstack guy).

So let's see how we can build a simple GraphQl server with Hasura and PostgreSQL and then connect to it from the front end using React and Apollo.

Let's start creating our app, let's make it simple and use create-react-app for that

```Nodejs
npx create-react-app graphqlapp && cd graphqlapp
```

We install the dependencies we need for it

```Nodejs
yarn add apollo-boost @apollo/react-hooks graphql
```

And then we can start our app

```Nodejs
yarn start
```

Now it's time to set up our GraphQl server, nothing could be more easier with Hasura and Heroku. You can check their [starting page](https://hasura.io/docs/1.0/graphql/manual/getting-started/heroku-simple.html) or if you prefer just click on [this link](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku) and wait for your heroku app to be created.

Next click on view app and you should have your PostgreSQL server running, with GraphQl and also GraphiQL, which is basically a UI for your GraphQL server. I also installed the [Apollo devtools](https://github.com/apollographql/apollo-client-devtools) for chrome.

So let's leave our app for a second and let's go to the database. Click on data in to the top level menu and and then click on **add table** in the left side navigation.

In this example we will create a simple app for searching our books so let's add the table books and then we add some fields:
id: integer auto-increment - this is our unique key
title: Character varying
description: Text (we add a brief description of the book)
author: Character varying
added: timestamp (choose now() as default value)

Keep in mind that I am not an expert on PostgreSQL, and these fields are created based on a quick read of their tutorials. But this is the nice part of GraphQL right? No backend, no need to learn more stuff, we can focus 100% on our front end!

Let's add some data to it, I will add 2 of my favorite books:
Meditations by Marcus Aurelius
Atomic habits by James clear

You can add the books you want and then we have the first 2 items in our database. Let's go to the GraphiQL UI and let's try a simple grapqhl query:

```javascript
query books {
  books {
    id
    title
    author
  }
}
```

Here we are getting our books, but - and this is the nicest part of GraphQL - we are only requesting the id, title and author, we don't want to have the description in our case.
Hit the "play button" next to GraphQL and in the right column you should see the results, an object like this:

```Javascript
{
  "data": {
    "books": [
      {
        "id": 1,
        "title": "Meditations",
        "author": "Marcus Aurelius"
      },
      {
        "id": 2,
        "title": "Atomic habits",
        "author": "James Clear"
      }
    ]
  }
}
```

Done! One thing to keep in mind, Grahql always returns 200 no matter what is the results. If you are used to rest API, you have now a different way of managing errors. GraphQL will always return an object and this object contains 3 main values:
data - the results of the query
errors - if there is any error (this is how you should manage errors in GraphQL apps)
metadata - extra data (we won't talk about this for now)

Now we have our backend setup, let's move on to the front end.

If you installed all correctly now it's time to connect our app to our Graphql server via Apollo client.

You still need one thing from the server, the GraphQL endpoint. This is visible in GraphiQL. Copy that url and let's move on with Apollo.

Open the index.js file in your app and import the Apollo Client:

```js
import ApolloClient from 'apollo-boost';
```

Let's create our client:

```javascript
const client = new ApolloClient({
  uri: 'https://${YOUR_APP_NAME}.herokuapp.com/v1/graphql'
});
```

We are now ready to fetch our data. Let's import Apollo Provider. Apollo Provider works like Contect.Provider or styled-components provider, making our client endpoint accessible to all the app.

```js
import { ApolloProvider } from '@apollo/react-hooks';
```

Let's add it to our APP:

```js
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
```

Let's create our first query now. We move in to App.js and there we need to import a hook that we will use for querying our database, together with the graphql tag for writing the query:

```js
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
```

Let's write our first query, we can copy the one we used initially in the GraphiQL UI:

```js
const BOOKS_QUERY = gql`
  {
    books {
      id
      title
      author
    }
  }
`;
```

Now let's create a simple component that executes the query and renders these results:

```jsx
const BooksList = () => {
  const { loading, error, data } = useQuery(BOOKS_QUERY);
  if (loading) {
    return <p>Loading results ... </p>;
  }
  if (error) {
    return <p> Ops .. something went wrong</p>;
  }
  return data.books.map(book => (
    <div key={book.id}>
      <p>title: {book.title}</p>
      <p>Author: {book.author}</p>
    </div>
  ));
};
```

What we do here is pretty simple:
First we get the data with `useQuery` as I said before Graphql always returns 200 as response, but Apollo does the good job of handling the error for us, same for the loading state.

Let's change our App.js to use the <BooksList> component:

```jsx
<div className="App">
  <header className="App-header">
    <BooksList />
  </header>
</div>
```

If everything went fine you should see the list in your App!

That's it! It was more easy than it looked. Have fun with GraphQL!

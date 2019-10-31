---
path: '/blog/understanding-state-in-react-js'
layout: post
title: 'ReactJs State and UI components'
date: 2019-10-30
category: code
introduction: 'A brief introduction to UI Components and React State'
status: 'published'
---

ReactJs (or React for brevity) is the most popular JavaScript UI Library out there. One of the feature that made React so popular and pushed for his adoption is the so-called _Virtual DOM_. A virtual DOM is a tree that represent the actual elements in the DOM, each element in this tree is a React Component which might or might not contain data. ReactJs knows which element had changed its data and renders in to the DOM only those elements.

Understanding how this `data` can be manipulated in React is important as each re-render (and so the perfomance) are connected to it.

## React Components and Data

In ReactJs we have 2 different types of data

- Props. Data passed from some other component. This data is immutable, we cannot mutate props.
- State. Internal data manipulated by the component.

Props are just read only values that are passed to the component. We can only read them. So I will focus on React `state` for this article.

## Different Types of State in React

When working with UI components and React we can have 2 type of state:

- _Local State_. Data manipulated directly by the component
- _Global State_. Data shared by several components. E.G: MobX/Redux or the Context API.

React gives us a method called `setState` for manipulate data inside the components, we also have hooks but we will look at this later.
State is also immutable, it means that each time we call `setState` we should return a new object:

```JSX

this.setState({
  // Creates a new object merging old state and new values
  ...this.state,
  stateProp: newValue
});

```

### Local State

Local state is data manipulated directly by the Component. A component that does not uses state is called (guess what?) stateless component :)
When working with classes our state is managed inside the class with `this.state`:

```JSX
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearchVisible: false,
        };

        this.toggleSearch = this.toggleSearch.bind(this);
    }

    toggleSearch(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            isSearchVisible: !this.state.isSearchVisible
        })
    }


    render() {
        const { isSearchVisible } = this.state;

        return (
            <Search>
                <SearchButton onClick={this.toggleSearch} >
                <SearchInput visible={isSearchVisible}>
            </Search>
        )
    }
}

```

This state is local to the search component, but this is also a lot of boilerplate for simply clicking a button and I am not a big fan of classes.
We can simplify this code using function components and hooks:

```JSX
function Search() {
    const [isSearchVisible, toggleSearch] = useState(false);

    const toggleSearch = e => {
        e.preventDefault();
        toggleSearch(!isSearchVisible);
    }

    return (
        <Search>
            <SearchButton onClick={this.toggleSearch} >
            <SearchInput visible={isSearchVisible}>
        </Search>
    )
}

```

In the previous example I used for the local state, the `SearchInput` is depending on the `Search` component to be visible. We could abstract the logic in a hook to reduce even more the code.

```JSX

function useVisibilityToggle(isVisible = false) {
    const [visible, toggle] = useState(isVisible);
    const onToggle = () => {
        toggle(!visible)
    };

    return [visible, toggle];

}

// Use the new Hook

function NewComp() {
    const [visible, onToggle] = useVisibilityToggle(false);

    return (
        <NewContainer>
            <Button onClick={onToggle} >
            <SearchInput visible={visible}>
        </NewContainer>
    )
}


```

Now we can reuse it at least more easily among our components, making it a bit easier to use it with few extra lines.

### Global State

Global state is state that is shared among different components (not necessarily in the same hierarchy or nested). There are several libraries like Redux or MobX for global state management but React has also its own API, the Context API. Libraries add obviously a lot of boilerplate code and are useful for managing large objcts (state is always a single object) while the Context API are good enough for handling simple primitive values, like for example a `dark theme` or the language.

I won't go in details with the libraries, as there are tons of tutorials for learning how to use them, but let's look at how we can handle global state with the React API.

### Context API

```JSX

const ThemeContext= React.createContext('dark');

// Set a display name property for our context
// So we can debug it in dev tools

ThemeContext.displayName = 'Theme';

function Component({children}) {
    return (
        <ThemeContext.Provider value="dark">
            {children}
        </ThemeContext.Provider>
    );
}

function SubComponent() {
    return (
        <ThemeContext.Consumer value="dark">
            {
                value => (
                    <Modal style={value} />
                )
            }
        </ThemeContext.Consumer>
    );
}

```

The `Modal` component will render the dark or light style, depending on what is passed. We can update this value:

```JSX

function SubComponent() {
    const [isDarkTheme, setTheme] = useState(false);

    const toggleDarkTheme = () => {
        setTheme(!isDarkTheme);
    }
    const theme = isDarkTheme ? 'dark' : 'light';
    return (
        <>
        <Button onClick={toggleDarkTheme}>
        <ThemeContext.Consumer value={theme}>
            {
                value => (
                    <Modal style={value} />
                )
            }
        </ThemeContext.Consumer>
    );
}

```

## When To Use Global State

Generally speaking, in JavaScript everything that is global is considered bad as it carries always side-effects. React is based on the concept of splitting our UI in components and making those components rely on global state might not be the best solution. Obviously there are exceptions, a state for a user if is loggedin or a language variable, or the theme example I used above. Those are all cases when we can use global state.

But as a general rule, especially with new additions like hooks I think there are less and less case for using global state. A design system and its component should not depend on external state, unless is really inevitable.

Reference and Reading List:

- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Context API](https://reactjs.org/docs/context.html)
- [Redux](https://redux.js.org/)
- [MobX](https://github.com/mobxjs/mobx-react)

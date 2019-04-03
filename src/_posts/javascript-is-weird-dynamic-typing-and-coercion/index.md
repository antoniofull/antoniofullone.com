---
path: '/blog/javascript-dynamic-typing-coercion'
layout: post
title: 'Javascript is weird: Dynamic typing and coercion'
date: 2019-04-02 19:40:00
category: coding
image: 'https://www.antoniofullone.com/images/posts/javascript_underwater.jpg'
imageDesc: 'Source Programming Humor on Reddit'
introduction: 'Understanding dynamic typing and coercion in Javascript. (Yeah Javascript is weird ... )'
status: 'published'
---

When I moved the the Netherlands, in my first job I worked for a company where I was the only Front End guy in a group of Java developers. React wasn't in the market yet and the term SPA was mostly referring to a relaxing place to go. jQuery was still the king of the Javascript Frameworks.

During our lunch discussions I was trying to make Javascript look like a cool language, until one day our lead dev told me **_"Just get over it, Javascript is weird!"_**. He is a very nice guy and now works as principal developer for one of the biggest company here in Europe. More important, he was right, Javascript can be weird if you don't understand some of its core principles.

Some days ago, while organizing my office, I found a moleskine I had during that period where I added a lot of notes on my learning about javascript. It reminded me of this episode and I decided to convert these notes it in a series of posts using my former colleague definition: **Javascript is weird**.

## Dynamic typing and coercion

Javascript is a dynamically-typed language. This means that the JS engine will convert any variable to the proper type based on the value. If you declare

```javascript
let ticketId = '1234';
typeof ticketID; // "String"
```

and then later on you do

```javascript
ticketId = 5678;
typeof ticketID; // "Number"
```

If you try to do this with Python or any other statically-typed language you will get an error, but the JS engine will not. It will simply do the conversion when the code is running.

Now we know that the type of `ticketID` is a number correct? But if we do now something like this:

```javascript
ticketID += '10';
typeof ticketId; // "String" -> WTF?
```

Yep, now our ticket is again a String. I suggest to bookmark this [page](https://getify.github.io/coercions-grid/) and keep it as reference to understand all the WTF going on with JS and types.

What is happening here is called **coercion** and it refers to this conversion, done at run time, by the javascript engine. Coercion can cause a lot of unexpected bugs and it's not just about converting numbers to string. Let's look at this very simple example

```javascript
'use strict';
a = 20;
// Uncaught ReferenceError: a is not defined

// without "use strict"
a = 20; // 20
console.log(this.a); // 20
```

The variable `a`, without `"use strict"` belongs to the global object, `window`.
This is also one of the reason why `"use strict"` is used.

Same problems can arise when we compare them. I think we all know this and why it is happening:

```javascript
let numberId = 20;
let stringID = '20';

console.log(numberId == stringID); // true no type compared
console.log(numberId === stringID); // false type compared
```

But let's look at this one, can you guess if it's true or false?

```javascript
console.log(1 < 2 < 3);
```

Of course it returns `true`! What about this?

```javascript
console.log(3 < 2 < 1); // true WTF?
```

So what is happening here? It is obvious that 3 is greater than 2 and that 2 is greater than 1, so why it is returning true?
Let's look at it step by step

```javascript
3 < 2 < 1;
// 3 < 2 returns a Boolean
// So the next expression is comparing the result of 3 < 2
// which is false, so is
false < 1;
// but false is not a number
// so the JS engine will convert it to a Number in order to compare it
Number(false) < 1;
// converting false to a number returns 0
// thus 0 is less than 1 and so ... true
0 < 1; // true
```

The same was for the previous expression, 1 is less than 2 so now we compare true to 3 and `Number(true)` returns 1 so 1 is less than 3, the expression returns true.
`Number(false)` will return 0, so that means that if we do something like :

```javascript
ticketID = 0;
// our variable ticketID is equal to 0 and so is false
if (ticketID) {
  // NOthing happens, ticketID is false
  // The if statement converts ticketID to boolean
  // Boolean(0) -> false
}
```

In javascript, 0 is coerced to false when converted to a Boolean, same goes for an empty string or undefined or null

```javascript
let num = 0;
let str = '';
let a;
// These are all false
```

Also `NaN` returns false. NaN stands for "Not A Number" but its type is number, confusing uh?

```javascript
typeof NaN; // Number!!
```

Same as `typeof null` will return object, same as `typeof []` for arrays.

And finally let's look at another WTF

```javascript
let myVar;
Number(myVar); // NaN

let myNewVar = null; // never do that
Number(myNewVar); // 0
```

So yes, some parts of javascript are weird, others are [good](http://shop.oreilly.com/product/9780596517748.do).
I will try to write other posts taked from these notes, so hopefully with this post I can also announce that I am **_back to blogging_**.

Final note:
[Typescript](https://github.com/Microsoft/TypeScript) and [Flow](https://flow.org/) are the 2 most well known solutions for using static types in JS, but keep in mind that while typescript is a superset of the language, flow is just a static checker.

Image credits: [Programming Humor](https://www.reddit.com/r/ProgrammerHumor/comments/8w0fve/i_will_try_this/www.reddit.com')

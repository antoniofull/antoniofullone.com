---
path: '/blog/momentjs-order-date'
layout: post
headtitle: 'Order an array of objects by date, using momentjs'
description: 'How to order an array of objecs by date. Using momentjs library'
metatag: 'javascript, array, momentjs'
title: Sort an array of objects by date using moment
date: 2018-01-07 17:25:00
category: coding
imageDesc: 'quick tip on how to sort an array by date, using momentjs'
image: 'https://antoniofullone.com/images/posts/array.png'
---

Sorting and ordering an array is quite easy, just use `array.sort` and pass the function which returns the difference. For instance:

```javascript
const arr = [0, 10, 2, 3];
const newarr = arr.sort((a, b) => {
  return a - b;
});
```

Last week I needed to order an array of objects by their date. The array uses [momentjs](https://momentjs.com) to render the dates. Looking at the moment documentation, very well written, I found easily the solution:

```javascript
const arr = [
  { _id: 1, createdAt: moment('Sat Jan 07 2018 11:50:21 GMT+0000 (WET)') },
  { d_id: 2, createdAt: moment('Sat Jan 06 2018 11:50:21 GMT+0000 (WET)') }
];

const newarr = arr.sort((a, b) => {
  return moment(a.createdAt).diff(b.createdAt);
});
```

This will sort the array by date with **moment**. Easy peasy :smile:

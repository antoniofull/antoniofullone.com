---
path: '/blog/off-canvas-css'
layout: post
title: 'Off Canvas with only Css'
date: 2015-04-03 19:40:00
category: coding
image: 'https://www.antoniofullone.com/images/posts/off-canvas.png'
imageDesc: 'Off Canvas with Css'
introduction: 'Create Off Canvas using CSS and no Javascript'
---

Yesterday evening I was bored at home (as usual) and the weather was cold (as usual) so I decided to spend some time fixing some bug on this site.

I linked the "contact" link in the navigation to the contact section in the footer. My friend [Marco](https://twitter.com/twittgrinder) suggested me that this way was not clear on how to find to contact so I looked for a solution, which I founded in the :target [pseudo selector](https://www.w3.org/wiki/CSS/Selectors/pseudo-classes/:target).

How :target work is pretty simple, it just matches the selector id with the hash in the url. So if you have a url like this mysite.com/#contact you can style your element with #contact:target. And so I did for the email link in the footer and highlight the email link in bold-red when matching the target.

After that I started to experiment a little bit with this selector, and i came up with this (kinda of silly) off canvas.
Basically with no javascript and no [checkbox hack](https://css-tricks.com/the-checkbox-hack/) it is possible to create a complete menu. Another trick I used is on the close button, where I just change the #hash and so removing the style to the sidebar. You can check the example [here](/off-canvas/) and on [codepen](https://codepen.io/lastwebdesigner/pen/JoVVOp), and the code [here](https://bitbucket.org/afullone/off-canvas-with-css).

Of course keep in mind that is something that would never end up in production but it was fun to play with it. Highliting the section I think is ok to use it, as it is just an enhancement. :D

Go to example : [Off Canvas with only Css using the :target pseudo selector](/off-canvas/)

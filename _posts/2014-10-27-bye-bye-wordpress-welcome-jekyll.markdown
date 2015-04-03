---
layout: post
title:  "Bye Bye Wordpress, welcome Jekyll!"
date:   2014-10-27 21:48:02
categories: dev
image:  "jekyll.png"
imageDesc: "By Bye Wordpress"
---	
I use to blog a couples of times for year, maybe three. Wordpress is really too much for me, I am tired of dealing with updates, database, plugins, spam. I did a first small move the last time that I redesigned my blog, making the about and home page static, and moving only to (real) blog part to Wordpress, but it turnout that was even more hard to maintain.

Also the template system in Wordpress is complex while I, as you can see, I like to keep this site much simple as possible.

The answer to all my questions is Jekyll. I was intrigued to use it, but a little bit “scared”,  I found out instead that is really easy to set up and use. I installed the Mac version, opened my Textmate and started moving the code from Wordpress to static pages in less than a weekend. 

Jekyll has his own template system, and once you do the build, the only thing is to use the same name pattern for the posts.

Another reason why I moved to Jekyll is the fact that I love writing with IAWriter, which has a very good support for Markdown, and Jekyll uses Markdown for its posts, so it’s a perfect combination.

The last thing to do was to find a good way to avoid to deploy manually every time, so I found [Glynn](https://github.com/dmathieu/glynn) which does the job for you, deploying also on the FTP.

Next step is to move also my italian blog (which basically will just be a copy of this one, but probably different contents) where I use to blog more often, like 6/7 times a year.

I am very happy now with the results, here some simple advantages I found on Jekyll: 

- Template : as I said above, easy, simple faster.
- Static pages mean also speed, the page now load much faster.
- Easy writing with Markdown.
- Ridiculously easy to update and maintain. You just need a grunt file.
- More freedom on styling and editing the posts, I can get rid of the rigid template system and build custom post each time I want.
- Easy to update. It’s just html right? :D

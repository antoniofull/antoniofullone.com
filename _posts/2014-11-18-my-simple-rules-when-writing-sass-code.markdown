---
layout: post
title:  My simple rules when writing Sass
date:   2014-11-18 22:00:00
categories: dev
---

**Sass** is awesome. It is an incredible tool that gives a lot of power to our css code but, as we know, “*with great power comes great responsibility*”.

When writing **Sass**, especially at the beginning, it’s easy to **bloat** your code. The reason is the *misuse* of the various features without, often, thinking forward to the compiled code. 
I have some simple rules that I apply every time I am writing code with **Sass**.

## Don’t @extend everything.

Is an easy one. You start using the @*extend* feature, you get excited, you think you are doing **OOCSS** the right way, and at some point you end up having code like that 

	.class1, .class2,  .class3,  .class4,  .class5,  .class6,  .class7,  .class8,  .class9,  .class10,  .class11,  .class12,  .class12,  .class14, .and-so-on {
		text-align: center;
		line-height: 1.4;
		display: block;
	}

While it would have been much more easy to just use one class and add it to the html 

	.one-class { 
		text-align: center;
		line-height: 1.4;
		display: block;
	}

Or even worse you not only extend, but also adding new css code to the extended class, so your code end up in this 

	.class1, .class2,  .class3,  .class4,  .class5,  .class6,  .class7,  .class8,  .class9,  .class10,  .class11,  .class12,  .class12,  .class14, .and-so-on {
		text-align: center;
		line-height: 1.4;
		display: block;
	}

	.class3 {
		color: red;
	}

	.class4{
		color:blue;
	}

In this case, might be simpler just to use a mixin 

	@mixin text-align($color: blue) {
		text-align: center;
		line-height: 1.4;
		display: block;
		color: $color;
	}

## Don’t nest everything.

Like @*extend*, this is also a super abused feature of Sass. Nesting can be very bad for our code, can screw up specificity and make your code unmaintainable.

I try to extend as *less as I can*, if possible I prefer to add another class. On the other side, nesting is not bad if used carefully. One of the good use I found for it is when I am writing code for a module.

	.landing {
  // every thing goes nested here at one level
  	.landing__element {
			
		}
		.landing—modifier {
			
		}
	}

In this case I am creating a sort of “namespace” for my module. Usually the class, like in this case .landing, is the body or the main container. 

Many Sass experts suggest to do not nest more than 3 levels, I am not an expert but in my opinion 3 level is already a lot, especially if using ID’s or just simple selectors. 

	.class {
	  #div {
		  p {
			  span.class {
				}
			}
		}
	}

This is wrong, and not only for the nesting. 

## Use less ID (or not at all)

Well .. we all know that there is hot a debate here, which is not strictly related to Sass but in somehow it is since Sass is perfect for those who love **OOCSS**. I am not a religious fan of **OOCSS**, I am a fan of the *right approach for each project* (not always means OOCSS or sass), but when writing code for a large codebase, which is probably modular and using a preprocessor (that might not be sass), *the use of ID*, or at least the massive use of it, is likely to create a lot of specificity problems.

A good solution suggested is using **div[id=test**] instead of #**test** this is because the latter has a higher specificity while the first has the same specificity of the class. To be honest I don’t see any reason, or at least could not find any use case, to use div[id=test] while I can just use a class. 

**Harry Roberts** has released a very interesting tool lately, [the Specificity Graph](http://csswizardry.com/2014/10/the-specificity-graph/), I suggest you to give a look at it.

If I am writing code for my small website/blog I am likely to use ID’s and style them, as the code is not big and I am fully aware of what I am doing,even more since I am the only person that basically touches the code. But when working with other people on a huge codebase, avoid or just limiting the use of ID is a huge, visible, improvement.

## Use Maps when it is possible

Sass Maps are awesome. With Sass now is possible to store an array of variable, like a sort of “hash” in javascript.
I am using it since their release and, despite some issues with some tools that still do not support them, I am loving it.

	$bp (
	  small: 20em,
	  large: 45em
	)

Here some example where the use of maps eases the workflow and,
also important, the problem of naming variables.

- Color Palette
- Z-Index Layers
- Responsive Break Points
- Typography Scale

The advantage is not only the better organization of the variables, take a look at this article to better understand how Maps can be very powerful.

## Use nested Media Queries with @content

Just another awesome feature that not everyone I see is using it. @content is very powerful and I found the best use when writing media queries.

	.class {
		// Styles
		@include mq(map-get($bp, large)) {
			// Media queries
		}
	}

Why should I re-rewrite my selectors while I can just nest the Media Queries? There is no need to re-write your selectors, just use a nested media query.

## Modules for everything

Writing modular is the best approach ever to writing css code. No matter if you are using [OOCSS](http://oocss.org), [SMACCS](https://smacss.com) or whatsoever, using a modular approach to your code can only brings benefits to the team. The Sass @import does the magic for you, importing directly the modules in the main file without doing any http request.

Usually my style.scss file looks like this : 

	@import “partial/variables”;
	@import “partial/functions”;
	@import “lib/susy/susy”;
	@import “lib/mixins”;
	@import “modules/headers/header”;
	// And so on with the other modules.

I never write sass code directly in the main file, I only use import and everything is written inside small modules that are then imported. It makes the code much easier to maintain, update and understand for your new colleagues.

So here they are, some simple rules that help me to get out the most of Sass without bloat the code, keeping it clean and reusable. 
 
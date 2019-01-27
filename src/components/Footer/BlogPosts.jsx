import React from 'react';

import {blogData} from '../../data';
console.log(blogData);
const BlogPosts = () => (
    <section className='blog'>
        <h3 className='footer-header'>Latest from the Blog</h3>
        <div className='post-container'>
            {blogData.length > 0 && blogData.map(item =>(
                <article key={item.id} className='post'>
                    <h3 className='post__title'>{item.title}</h3>
                    <a href={item.link}>
                        <img className='post__image' src={item.img} alt={item.title} />                
                    </a>
                </article>
            ))}
        </div>
    </section>
);

export default BlogPosts;
import React from 'react';

import {blogData} from '../../data';

const BlogPosts = () => (
    <section>
        <h3>Latest from the Blog</h3>
        <div>
            {blogData.length > 0 && blogData.map(item =>(
                <article key={item.id}>
                    <h4>{item.title}</h4>
                    <img src={item.img} alt={item.title} />
                </article>
            ))}
        </div>
    </section>
);

export default BlogPosts;
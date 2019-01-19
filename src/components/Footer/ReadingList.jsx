import React from 'react';
import {readingItems} from '../../data';

const ReadingList = () => (
    <div>
        <h3>Reading List</h3>
        <ul>
            {readingItems.length > 0 && readingItems.map(book => (
              <li key={book.id}>
                <a href={book.link}>{book.title}</a>
              </li>  
            ))}
        </ul>
    </div>
);

export default ReadingList;
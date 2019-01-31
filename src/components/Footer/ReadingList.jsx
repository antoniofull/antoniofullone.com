import React from 'react';
import { readingItems } from '../../data';

const ReadingList = () => (
  <section className="reading extra">
    <h3 className="footer-header">Reading List</h3>
    <ul>
      {readingItems.length > 0 &&
        readingItems.map(book => (
          <li key={book.id}>
            <a href={book.link}>{book.title}</a>
          </li>
        ))}
    </ul>
  </section>
);

export default ReadingList;

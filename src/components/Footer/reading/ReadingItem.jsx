import React from 'react';
import PropTypes from 'prop-types';

const ReadingItem = ({ book }) => (
  <li key={book.id}>
    <a href={book.link}>{book.title}</a>
  </li>
);

ReadingItem.propTypes = {
  book: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ReadingItem;

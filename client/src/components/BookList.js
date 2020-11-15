import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

function BookList({ data }) {
  const [selected, setSelected] = useState(null);
  const { loading, books } = data;

  function displayBooks() {
    if (loading) {
      return <div>Loading books...</div>;
    } else {
      if (!books || !books.length) {
        return <div>No books to show..</div>;
      }
      return data.books.map((book) => {
        return (
          <li key={book.id} onClick={(e) => setSelected(book.id)}>
            {book.name}
          </li>
        );
      });
    }
  }

  return (
    <div>
      <ul id='book-list'>{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);

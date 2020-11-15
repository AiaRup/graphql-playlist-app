import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';

import { getBooksQuery, deleteBookMutation } from '../queries/queries';

// components
import BookDetails from './BookDetails';

function BookList({ getBooksQuery, deleteBookMutation }) {
  const [selected, setSelected] = useState(null);
  const { loading, books } = getBooksQuery;

  function displayBooks() {
    if (loading) {
      return <div>Loading books...</div>;
    } else {
      if (!books || !books.length) {
        return <div>No books to show..</div>;
      }
      return books.map((book) => {
        return (
          <li key={book.id}>
            <span onClick={(e) => setSelected(book.id)}>{book.name}</span>
            <span
              className='delete-book'
              onClick={() => {
                deleteBookMutation({
                  variables: {
                    id: book.id,
                  },
                  refetchQueries: [{ query: getBooksQuery }],
                });
                setSelected(null);
              }}
            >
              x
            </span>
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

export default compose(
  graphql(getBooksQuery, { name: 'getBooksQuery' }),
  graphql(deleteBookMutation, { name: 'deleteBookMutation' })
)(BookList);

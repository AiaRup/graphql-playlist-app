import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

function BookList({ data }) {
  const { loading, books } = data;

  function displayBooks() {
    if (loading) {
      return <div>Loading books...</div>;
    } else {
      if (!books || !books.length) {
        return <div>No books to show..</div>;
      }
      return data.books.map((book) => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  }

  return (
    <div>
      <ul id='book-list'>{displayBooks()}</ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);

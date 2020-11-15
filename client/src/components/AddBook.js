import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

function AddBook({ getAuthorsQuery, addBookMutation }) {
  const { loading, authors } = getAuthorsQuery;
  const [genre, setGenre] = useState('');
  const [name, setName] = useState('');
  const [authorId, setAuthor] = useState('');

  function displayAuthors() {
    if (loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  function submitForm(e) {
    e.preventDefault();
    addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  }

  return (
    <form id='add-book' onSubmit={submitForm}>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input type='text' onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select onChange={(e) => setAuthor(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);

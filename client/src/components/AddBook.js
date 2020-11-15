import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../queries/queries';

function AddBook({ data }) {
  const { loading, authors } = data;
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
    console.log({ genre, name, authorId });
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

export default graphql(getAuthorsQuery)(AddBook);

import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

function AddBook({ data }) {
  const { loading, authors } = data;

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

  return (
    <form id='add-book'>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input type='text' />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default graphql(getAuthorsQuery)(AddBook);

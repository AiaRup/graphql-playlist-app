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
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  return (
    <div>
      <ul id='book-list'>
        <li>Book name</li>
      </ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const SERVER_PORT = process.env.PORT || 4000;

app.listen(SERVER_PORT, () =>
  console.log(`Server up and running on port ${SERVER_PORT}...`)
);

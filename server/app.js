const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const schema = require('./schema/schema');

const app = express();

// allow cross-origin requests
app.use(cors);

// connect to DB and check the connection
const connection =
  process.env.CONNECTION_STRING || 'mongodb://localhost:27017/DB Name';
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false,
  })
  .then(() => {
    console.log('Successfully connected to mongoDB');
  })
  .catch((error) => console.error(error));

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

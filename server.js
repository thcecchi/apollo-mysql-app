import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './server/api/schema';
import { resolvers } from './server/api/resolvers';
const { getTokenFromRequest } = require('./server/utils/authUtils');

const myGraphqlSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 8080;

const app = express();

app.use(cors())

//bodyParser is needed just for post
app.use('/graphql', bodyParser.json(), graphqlExpress(request => ({
  schema: myGraphqlSchema,
  context: { token: getTokenFromRequest(request) }
})));

// graphiql config
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
});

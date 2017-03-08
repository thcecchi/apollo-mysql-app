import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './server/api/schema';
import { resolvers } from './server/api/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const myGraphqlSchema = schema;
const PORT = 3001;

const app = express();

//bodyParser is needed just for post
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphqlSchema, context: {} }));

// app.get('/graphql',function(req,res){
//   res.sendFile('index.html', { root: './public' });
// });

// graphiql config
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
});

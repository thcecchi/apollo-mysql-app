import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';


const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8080/graphql',
    headers: {
  		'Content-Type': 'application/json'
  	},
    opts: {
      credentials: 'same-origin',
    },
    queryTransformer: addTypename,
    dataIdFromObject: (result) => {
      if (result.id && result.__typename) {
        return result.__typename + result.id
      }
      return null
    }
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

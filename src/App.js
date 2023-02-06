import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const client = new ApolloClient({
    uri: 'https://apidev4.sapien.systems/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default App;

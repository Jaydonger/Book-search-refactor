import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// just apollo things :D
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // getting token from local
  const token = localStorage.getItem('id_token');
  // returning headers for httpLink
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Setting up client to do middleware
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


// importing and adding apolloProvider as wrapper in app() return
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={SearchBooks} />
            <Route path='/saved' element={SavedBooks} />
            <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
const express = require('express');

// needs ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// needs typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas')
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
// does not need routes
// const routes = require('./routes');

// dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// needs server connection to ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// not using routes
// app.use(routes);

// reformatting
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// should now be constructed to work with ApolloServer
startApolloServer();
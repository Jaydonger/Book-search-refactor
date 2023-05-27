const { gql } = require('apollo-server-express');

// typeDefs skeletony
const typeDefs = gql`
type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

input SaveBookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SaveBookInput): User
    removeBook(bookId: String!): User
}
`;

module.exports = typeDefs;
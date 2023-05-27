const { gql } = require('apollo-server-express');

// typeDefs skeletony
const typeDefs = gql`
type Book {
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

input BookInput {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
}

type Query {
    myBooks: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput): User
    removeBook(bookId: String!): User
}
`;

module.exports = typeDefs;
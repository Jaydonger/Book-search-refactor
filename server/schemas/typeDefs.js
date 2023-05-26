const { gql } = require('apollo-server-express');

// typeDefs skeletony
const typeDefs = gql`
type Book {
    _id: ID!
}
type User {
    _id: ID!
}
type Query {
}
type Mutation {
}
`;

module.exports = typeDefs;
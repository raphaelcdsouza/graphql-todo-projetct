import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    listToDos: String
  }

  type Mutation {
    login(email: String!): String!
    toDo: String!
  }
`

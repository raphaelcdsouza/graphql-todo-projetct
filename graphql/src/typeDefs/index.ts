import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    login(email: String!): String!
  }
`

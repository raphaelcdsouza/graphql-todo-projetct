import { gql } from 'apollo-server'

export const typeDefs = gql`
  type ToDo {
    _id: String
    title: String
    description: String
    category: String
    user: String
  }

  type Query {
    listToDos: String
  }

  type Mutation {
    login(email: String!): String!
    createToDo(title: String!, description: String!, category: String): ToDo!
  }
`

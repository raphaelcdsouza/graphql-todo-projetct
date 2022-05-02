import { gql } from 'apollo-server'

export const typeDefs = gql`
  type ToDo {
    _id: String
    title: String
    description: String
    category: String
    user: String
  }

  type Filters {
    categories: [String]
    title: String
    description: String
  }

  type Query {
    listToDos(categories: [String], title: String, description: String, email: String): [ToDo]
  }

  type Mutation {
    login(email: String!): String!
    createToDo(title: String!, description: String!, category: String): ToDo!
  }
`

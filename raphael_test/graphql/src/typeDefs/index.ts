import { gql } from 'apollo-server'

export const typeDefs = gql`
  type User {
    _id: String
    email: String
  }

  type ToDo {
    _id: String
    title: String
    description: String
    category: String
    user: User
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
    updateToDo(id: String!, title: String, description: String, category: String): ToDo!
    deleteToDo(id: String!): Boolean!
  }
`

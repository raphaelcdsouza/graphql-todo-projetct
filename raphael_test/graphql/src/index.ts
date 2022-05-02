import { ApolloServer } from 'apollo-server'
import { resolvers } from './operations/resolvers'
import { typeDefs } from './typeDefs'
import mongoose from 'mongoose'

import { config } from './config'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let token: string
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
    } else {
      token = ''
    }

    return { token }
  }
})

mongoose
  .connect(config.mongo.uri)
  .then(() => {
    server.listen()
      .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`)
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))

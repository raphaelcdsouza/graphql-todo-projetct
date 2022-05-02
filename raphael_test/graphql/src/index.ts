import { ApolloServer } from 'apollo-server'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'
import mongoose from 'mongoose'

import { config } from './config'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization ?? ''

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

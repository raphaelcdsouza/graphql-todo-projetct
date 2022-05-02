import { ApolloServer } from 'apollo-server'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization ?? ''

    return { token }
  }
})

server.listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
  .catch(err => console.log(err))

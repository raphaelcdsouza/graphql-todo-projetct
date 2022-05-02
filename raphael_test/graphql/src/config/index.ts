export const config = {
  mongo: {
    uri: process.env.MONGO_URI ?? ''
  },
  app: {
    jwtSecret: process.env.JWT_SECRET ?? ''
  }
}

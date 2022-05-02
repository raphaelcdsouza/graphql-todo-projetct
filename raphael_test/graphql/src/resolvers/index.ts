const login = (_: any, args: any): string => {
  return `JWT Token of ${args.email}`
}

const toDo = (_: any, __: any, context: any): string => {
  const token = context.token
  return token
}

export const resolvers = {
  Query: {
    toDo
  },
  Mutation: {
    login
  }
}

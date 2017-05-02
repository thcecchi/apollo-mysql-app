export const typeDefs = [`
  type Post {
    id: Int
    content: String
    views: Int
  }
  type Error {
    key: String
    value: String
  }
  type Auth {
    token: String
    errors: [Error]
  }
  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
  }
  type Query {
    posts(views: Int): [Post],
    users: [User]!
  }
  type Mutation {
    addPost (
      content: String!,
      views: Int
    ): Post,
    signUp(firstName: String!, lastName: String!, email: String!, password: String!): Auth,
    signIn(email: String!, password: String!): Auth
  }
  schema {
    query: Query
    mutation: Mutation
  }
`];

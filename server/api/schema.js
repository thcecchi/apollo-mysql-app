export const typeDefs = [`
  type Post {
    id: Int
    content: String
    views: Int
  }
  type Query {
    posts(views: Int): [Post]
  }
  type Mutation {
    addPost (
      content: String!,
      views: Int
    ): Post
  }
  schema {
    query: Query
    mutation: Mutation
  }
`];

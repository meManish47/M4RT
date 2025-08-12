import gql from "graphql-tag";
export const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean
    currentUser: User
  }
  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      username: String!
    ): User
    updateUserRole(userId: String!, role: String!):User
    updateUserProfile(userId:String!,name:String!,email:String!,username:String!,avatar:String):User
  }
  type User {
    id: String
    name: String
    username: String
    email: String
    role: String
    avatar: String
  }
`;

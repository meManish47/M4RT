import gql from "graphql-tag";
export const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean
    currentUser: User
    getAllUsers: [User]
    getAllProducts: [Product]
    getProductById(id: String!): Product
  }
  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      username: String!
      role: String
    ): UserResponse
    updateUserRole(userId: String!, role: String!): User
    updateUserProfile(
      userId: String!
      name: String!
      email: String!
      username: String!
      avatar: String
      role: String
    ): User
    addProduct(
      title: String!
      description: String!
      category: String!
      price: Float!
      stock: Int!
      imageUrl: String!
    ): Product
    createSale(id: String!, quantity: Int): Boolean
  }
  type User {
    id: String
    name: String
    username: String
    email: String
    role: String
    avatar: String
  }
  type Product {
    id: String
    title: String
    description: String
    category: String
    price: Float
    stock: Int
    imageUrl: String
    sales: [Sale]
  }
  type Sale {
    id: String
    productId: String
    quantity: String
    createdAt: String
  }
  type UserResponse {
    success: Boolean!
    message: String
    user: User
  }
`;

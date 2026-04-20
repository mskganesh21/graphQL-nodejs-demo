const typeDefs = `
  #--------------TYPES--------------

  type User {
    id: ID!
    email: String!
    orders(status: String): [Order]
    orderCount(status: String): Int
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    category: String!
  }

  type Order {
    id: ID!
    user: User!
    status: String!
    items: [OrderItem!]!
    total: Float
    orderPlacedOn: String
  }

  type OrderItem {
    id: ID!
    orderId: ID!
    product: Product!
    quantity: Int!
  }

  #------------- INPUT TYPES-------------
  input CreateUserInput {
    email: String!
  }

  #---------------QUERIES----------------------
  type Query {
    users: [User!]!
    user(id: ID!): User

    products(category: String): [Product!]!

    orders(userId: ID, status: String): [Order!]!

    order(id: ID!): Order
  }

  #---------------MUTATIONS---------------------
  type Mutation {
    createUser(input: CreateUserInput): User!
  }
`;

export default typeDefs;

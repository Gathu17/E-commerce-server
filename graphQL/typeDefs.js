const {gql} = require('apollo-server');

module.exports = gql`
type Product{
    id: ID!
    title: String!
    desc: String!
    img: String!
    size: String!
    color: String!
    price: Int!
    categories: [String]
}
type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    isAdmin: Boolean!
}
input RegisterInput{
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
}
input newProduct {
    title: String
    desc: String
    img: String
    size: String
    color: String
    price: Int!
    categories: [String]
}
type Stats{
    id: ID
    total: Int!
}
type Query{
    getProducts: [Product]
    getProduct(productId:ID!): Product
    getUser: User!
    getUsers:[User!]
    getStats: [Stats]
    getCart: Cart!
    getOrder: Order!
    getOrders: [Order!]
}
type Cart{
    id: ID
    userId:ID
    products:[CartProduct]
}
type Order{
    id: ID!
    userId:ID!
    products:[CartProduct]
    amount:Int
    address:String
    status:String
}
type CartProduct{
    id: ID!
    productId:ID
    quantity: Int
}
input OrderInput{
    productId: ID
    quantity:Int!
    amount: Int!
    address: String!
    status: String
}

type Mutation{
    createProduct(product: newProduct): Product!
    deleteProduct(productId:ID!): String!
    register(registerInput: RegisterInput):User!
    login(username: String!,password: String!): User!
    createCart(productId:ID!,quantity:Int!):Cart
    deleteCart(productId:ID!): String!
    addProduct(productId:ID!,quantity:Int!): Cart
    createOrder(orderInput:OrderInput): Order
    updateOrder(orderInput:OrderInput): Order!
    deleteOrder: String!
}
`
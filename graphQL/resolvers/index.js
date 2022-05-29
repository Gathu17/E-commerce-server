const productResolvers = require('./product');
const userResolvers = require('./user');
const cartResolvers = require('./cart')
const orderResolvers = require('./order');
module.exports = {
    Query: {
    ...productResolvers.Query,
    ...userResolvers.Query,
    ...cartResolvers.Query,
    ...orderResolvers.Query
    },
    Mutation: {
        ...productResolvers.Mutation,
        ...userResolvers.Mutation,
        ...cartResolvers.Mutation,
        ...orderResolvers.Mutation
    }
}
var {model,Schema} = require('mongoose');

const orderSchema = new Schema({
    userId: {type:String, unique:true},
    products:[{
        productId: String,
        quantity: {type: Number, default: 1},
    }],
    amount: {type: Number, default:0},
    address: {type: String, },
    status: {type:String, default:'pending'}
},{timestamps: true});

module.exports= new model('Order',orderSchema)
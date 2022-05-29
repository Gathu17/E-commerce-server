var {model,Schema} = require('mongoose');

const cartSchema = new Schema({
    userId: {type:String, unique:true},
    products:[{
        productId: String,
        quantity: {type: Number, default: 1},
    }]
},{timestamps: true});

module.exports= new model('Cart',cartSchema)
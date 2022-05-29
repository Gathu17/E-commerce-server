var {model,Schema} = require('mongoose');

const productSchema = new Schema({
    title: String,
    desc: String,
    img: String,
    categories: Array,
    size: Number,
    color: String,
    price: Number

},{timestamps: true}
);

module.exports = new model('Product',productSchema)
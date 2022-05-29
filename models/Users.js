var {model,Schema} = require('mongoose');

const userSchema = new Schema ({
    username: {type: String, unique: true}, 
    email: {type: String, unique: true},
    password: String,
    isAdmin:{type: Boolean, default: false}
},{timestamps: true}
)

module.exports = new model('User', userSchema);
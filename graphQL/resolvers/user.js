const User = require('../../models/Users');
require('dotenv').config();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegisterInput,validateLoginInput} = require('../../util/validators')
const checkAuth = require('../../util/check-auth')

function generateToken(user) {
    return jwt.sign({
        id: user.id, 
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin
    }, process.env.SECRET_KEY, {expiresIn: "6h"});
}
module.exports = {
    Query:{
        async getUsers(){
            try{
            const users = await User.find().sort({createdAt:-1})
            return users;
            }catch (err) {
                throw new Error(err)
            }
        }, 
        async getUser(_,{userId}){
            try{
                const users = await User.findById(userId)
                return users;
                }catch (err) {
                    throw new Error(err)
                }
        },
        async getStats(_,{},context){
            const date = new Date();
            const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
            const user = checkAuth(context);
            if(user&& user.isAdmin){
                 try{
                const data = await User.aggregate([
                   { $match: {createdAt:{$gte:lastYear}}},
                   {$project: {month:{$month: "$createdAt"}}},
                   {$group:{_id:"$month",
                           total: {$sum: 1
                        }}},
                ]);
               
                return data;
            }catch(err){
                throw new Error(err);
            }
            }else{
                console.log('haiya')
            }
           
        }
    },
    Mutation: {
        async register(_,{registerInput:{username,email,password,confirmPassword}},context,info){

            const {valid,errors} = validateRegisterInput(username,email,password,confirmPassword);

            if(!valid){
                throw new UserInputError('Error',{errors})
            }
            password = await bcrypt.hash(password,12);
            const newUser = new User({
                username,
                email,
                password,
                confirmPassword
            })
           
           const res = await newUser.save();
            const token = generateToken(res);
            return{
                ...res._doc,
                id: res._id,
                token
            }
        },
      async login(_,{username, password},context){

        const {valid,errors} = validateLoginInput(username,password);
        if(valid){
          const user = await User.findOne({username})
          
          if(user){
              const match = bcrypt.compare(password,user.password);
              if(!match){
                  errors.general='Wrong Credentials'
                throw new UserInputError('Wrong Credentials');
              }
              const token = generateToken(user);
              return{ 
                  ...user._doc,
                  id: user._id,
                  token
              }
              
          }else{
              errors.general='User not found'
              throw new UserInputError('User not found')
          }
        }else{
            throw new UserInputError('Errors',{errors});
        }
      }  
      
    }
}
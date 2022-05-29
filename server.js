const {ApolloServer} = require('apollo-server');
var mongoose = require('mongoose');
require('dotenv').config();
var express = require('express');
var app = express();
const stripe = require('stripe')(process.env.STRIPE_KEY);


const resolvers = require('./graphQL/resolvers/index');
const typeDefs = require('./graphQL/typeDefs')


const PORT = process.env.PORT || 5000;
app.use(express.json())
app.post('/payment',(req, res)=>{
    stripe.charges.create({
        source: req.body.tokeniId,
        amount: req.body.amount,
        currency: 'ksh' 
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes)
        }
    })
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) =>({req})
})

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(process.env.MONGO_URI)
    console.log(resolvers)
    server.listen({port:PORT})
.then((url)=> {
    console.log(`Server running at ${url}`)
});    
}).catch((err)=> {console.log(err)});
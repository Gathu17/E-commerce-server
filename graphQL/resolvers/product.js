
const {AuthenticationError} = require('apollo-server');

const Product = require('../../models/Product')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query: {
        async getProducts(){
           try{
               const products = await Product.find().sort({createdAt:-1})
               return products;
            }catch(err){
                throw new Error(err)
            } 
        }, 
        async getProduct(_, {productId}, context){
            try{
                const product = await Product.findById(productId);
                return product;
            }catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation: {
      async createProduct(_,{product:{title,desc,img,color,size,price,categories}}){
          const newProduct = new Product({
              title,desc,img,color,size,price,categories
          })
        const product = await newProduct.save();
        return product;
      },
      async deleteProduct(_,{productId},context){
          const user = checkAuth(context);
          if(user&&user.isAdmin){
              try{
                  const product = await Product.findById(productId);
              await product.delete();
              return"Product deleted successfully";
              }catch (err) {
                  throw new Error(err)
              }
              
          }else{
            throw new AuthenticationError('Action not allowed');
          }

      }
    }
}
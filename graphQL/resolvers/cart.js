const Cart = require('../../models/Cart');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query:{
        async getCart(_,__,context){
            const user = checkAuth(context);

            let [cart] = await Cart.find({userId: user.id});

            
            if(cart){
                return (cart)           
            }
        },
    },
    Mutation : {
       
        async createCart(_, {productId,quantity},context){
           const user = checkAuth(context);
        
        if(user){
            
         
             try{
                const newCart = new Cart({
                    userId: user.id,
                    products:{productId,quantity}
              })
              await newCart.save();
              return newCart;
             }catch (error) {
                 throw new Error(error);
             }
         }
            
        },
        async deleteCart(_,{productId}, context){
            const user = checkAuth(context);
            const [cart] = await Cart.find({userId: user.id})
            try{
               const productIndex = cart.products.findIndex(p => p.productId === productId);
                 cart.products.splice(productIndex, 1);
              
                await cart.save();
                return 'Removed from cart';
            }catch (error) {
                throw new Error(error);
            }
        },
        async addProduct(_,{productId,quantity},context){
        const user = checkAuth(context);

          if(user){
              let [cart] = await Cart.find({userId: user.id})
              if(cart){
                  cart.products.unshift({
                  productId,
                  quantity
              });
              }else{
                cart = new Cart({
                    userId: user.id,
                    products:{productId,quantity}
                })
              }
              
              await cart.save();
             return cart; 
          }
        }
    }
}
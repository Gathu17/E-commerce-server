const Order = require('../../models/Order');
const checkAuth = require('../../util/check-auth');
const {AuthenticationError} = require('apollo-server')


module.exports = {
    Query:{
        async getOrder(_,__,context){
            const user = checkAuth(context);
            try{
                 const [order] = await Order.find({userId: user.id});
                 return order;
            }catch(err){
                throw new Error(err);
            }

        },
        async getOrders(_,__,context){
            const user = checkAuth(context);
            if(user&&user.isAdmin){
                try{
                    const orders = await Order.find();
                    return orders;
                }catch(err){
                    throw new Error(err);
                }
            }else{
                throw new AuthenticationError('Action not allowed')
            }
        }
    },
    Mutation : {
        async createOrder(_,{orderInput:{productId,quantity,amount,address,status}},context){
            const user = checkAuth(context);
            if(user){
                try{
                    
                    const newOrder = new Order({
                        userId: user.id,
                        products:{productId,quantity},amount,address,status
                    })
                    
                    await newOrder.save();
                    return newOrder;
                }catch(err){
                    
                 throw new Error(err)
                }
                
            }

        },
        async updateOrder(_,{orderInput:{productId,quantity,amount,address,status}},context){
            const user = checkAuth(context);
            if(user){
                try{
                const order = await Order.findOneAndUpdate({userId: user.id},{products:{productId,quantity},amount,address,status},{new: true});
                await order.save();
                return order;
                }catch(e){throw new Error(e);}
            }
        },
        async deleteOrder(_,__,context){
            const user = checkAuth(context);
            if(user){
                try{
                const order = await Order.findOneAndDelete({userId: user.id})
                
                return 'Order deleted successfully'
                }catch(err){
                    throw new Error(err)
                }
            }
        }
    }
}
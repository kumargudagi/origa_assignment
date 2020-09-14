let ordersModel = require('../models/ordersModel')

module.exports = {
  saveOrder: async (payload) => {
    try {
      let order = new ordersModel(payload);
      let result = await order.save();
      return {status: true,data:result, message:'ok'}
    } catch (error) {
      return {status: false,data:[],message:`MongoError: ${error.message}`}
    }
  },

  getOrders: async (arrgregatequery) => {
    try {
      let result = await ordersModel.aggregate(arrgregatequery)
      
      if (result) {
        return {status: true,data: result}
      }
      return {status: false,data: result, message:'faild to get result'}
    } catch (error) {
      return {status: false,message:`MongoError: ${error.message}`,data:[]}
    }
  },

}
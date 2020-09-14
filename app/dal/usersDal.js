let usersModel = require('../models/usersModel')

module.exports = {
  saveUsers: async (payload) => {
    try {
      let user = new usersModel(payload);
      let result = await user.save();
      return {status: true,data:result, message:'ok'}
    } catch (error) {
      return {status: false,data:[],message:`MongoError: ${error.message}`}
    }
  },

  getUser: async (findquery) => {
    try {
      let result = await usersModel.find(findquery,{_id:0,__v:0,createdAt:0,updatedAt:0});
      if (result) {
        return {status: true,data: result}
      }
      return {status: false,data: result}
    } catch (error) {
      return {status: false,data: error.message}
    }
  },

  updateBulkUser: async (constraints) => {
    try {
      let result = await usersModel.bulkWrite(constraints);
      if (result) {
        return {status: true,data: result}
      }
      return {status: false,data: result}
    } catch (error) {
      return {status: false,data: error.message}
    }
  },
 

  updateSingUser: async (constraints,update) => {
    try {
      let result = await usersModel.findOneAndUpdate(constraints,update,{new:true});
      if (result) {
        return {status: true,data: result}
      }
      return {status: false,data: result}
    } catch (error) {
      return {status: false,data: error.message}
    }
  }
}
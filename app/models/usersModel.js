const mongoose = require("mongoose");
const collections = "users";

/**user schema */
const userSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  userId: {
    type: Number,
    unique: true
  },
  noOfOrders: {
    type: Number,
    default: 0
  },
  createdAt:{
    type: Date,
    default:new Date()
  },
  updatedAt:{
    type: Date,
    default:new Date()
  }
});

/**Hooks */
userSchema.pre("save", async function(next) {
  next();
});

module.exports = mongoose.model(collections, userSchema);

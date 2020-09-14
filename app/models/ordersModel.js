const mongoose = require("mongoose");
const collections = "orders";

/**order schema */
const orderSchema = mongoose.Schema({
  orderId: {
    type: Number,
    index: true
  },
  userId: {
    type: Number,
    unique: true
  },
  subtotal: {
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
orderSchema.pre("save", async function(next) {
  next();
});
module.exports = mongoose.model(collections, orderSchema);

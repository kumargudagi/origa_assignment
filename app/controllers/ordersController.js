const ordersDal= require('../dal/OrderDal')
const ordersController = new Object()

/**get users order */
ordersController.usersOrder = async (req, res) => {
  try {
    let arr =[];
    let userslookup = {
      $lookup:{
        from: "users",
        localField: "userId",
        foreignField: "userId",
        as: "users"
      }
    };
    let group = {
      $group:{
        _id: "$users",
        avgtotal: {$avg: "$subtotal"},
        numOfOrder: { $sum: 1 }
      }
    };
    arr.push(userslookup);
    arr.push({ $unwind: '$users'})
    arr.push(group);
    arr.push({
      $project:{
        _id:0,
        name: "$_id.name",
        userId: "$_id.userId",
        avgtotal:1,
        numOfOrder:1
    }
    })

    /**get the orders */
    let getUsersOrders = await ordersDal.getOrders(arr);

    /**if err return the response */
    if (!getUsersOrders.status) {
      return res.status(500).send({ success: false, message: getUsersOrders.message, data: getUsersOrders.data });
    }
    /**sucess response */
    return res.status(200).send({ success: true, message: 'ok', data: getUsersOrders.data });
  } catch (err) {
   return res.status(500).send({success:false, message: err.message, data:[] });
  }
}



/**create orders */
ordersController.createOrder = async (req, res) => {
  try {
    /**save the data in order */
    let save = await ordersDal.saveOrder(req.body);

    /**if err return the response */
    if (!save.status) {
      return res.status(500).send({ status: false, message: save.message, data: save.data });
    }
    /**sucess response */
    return res.status(200).send({ status: true, message: 'ok', data: save.data });
  } catch (err) {
   return res.status(500).send({status:false, message: err.message, data:[] });
  }
}

module.exports = ordersController;

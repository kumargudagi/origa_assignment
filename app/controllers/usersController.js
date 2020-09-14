const usersDal= require('../dal/usersDal')
const usersController = new Object()


usersController.userUpdate = async (req, res) => {
  try {
    /**update the user if bulkusers */
   let update;
    if(req.body.bulkUpdate){
      update = await usersDal.updateBulkUser(req.body.data);
    }

  /**update the user if single user */
    if(!req.body.bulkUpdate){
      update = await usersDal.updateSingUser({userId:req.body.data.userId},req.body.data);
    }

    /**if err in update return the response */
    if (!update.status) {
      return res.status(500).send({ success: false, message: update.message, data: update.data });
    }

    /**if no err in update get users */
    let getUser = await usersDal.getUser({});

    /**if err get user return the response */
    if (!getUser.status) {
      return res.status(500).send({ success: false, message: getUser.message, data: getUser.data });
    }

    /**sucess response */
    return res.status(200).send({ success: true, message: 'Successfully updated', data: getUser.data });
  } catch (err) {
   return res.status(500).send({success:false, message: err.message, data:[] });
  }
}

/**payloads for update api */

/**if bulk users */
/*
{
  "bulkUpdate":true,
  "data":[
     
      { 
          "updateOne": {
              "filter" : { "userId" : 1 },
              "update" : { "$set" : { "noOfOrders" : 5 } }
          }
      },
       { 
          "updateOne": {
              "filter" : { "userId" : 2 },
              "update" : { "$set" : { "noOfOrders" : 3 } }
          }
      },

       { 
          "updateOne": {
              "filter" : { "userId" : 3 },
              "update" : { "$set" : { "noOfOrders" : 2 } }
          }
      }
     
      
  ]
}
*/


/**if single user */
/*
{
    "bulkUpdate":false,
    "data":{
        "userId":3,
        "noOfOrders":10
    }
}
*/










/**create users */
usersController.createUser = async (req, res) => {
  try {
    /**save the data in user */
    let save = await usersDal.saveUsers(req.body);

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


module.exports = usersController;

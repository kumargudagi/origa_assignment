const defaultController = new Object()
const sleep = m => new Promise(r => setTimeout(r, m))

/**added delay: after 5 sec send response */
defaultController.defaultApi = async (req, res) => {
  try {
    (async () => {
      await sleep(5000)
      return res.status(200).send({ status: false, message: 'this is default route', data: {} });
  })()
   
  } catch (err) {
   return res.status(500).send({status:false, message: err.message, data:[] });
  }
}


/**without delay send response */
defaultController.register = async (req, res) => {
  try {
  return res.status(200).send({ status: false, message: 'this is register route', data: {} });
  } catch (err) {
   return res.status(500).send({status:false, message: err.message, data:[] });
  }
}

module.exports = defaultController;

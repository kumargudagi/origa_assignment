const mongoose = require('mongoose');
const retryIntervalInMS = 5000;
const connection = new Object();


const options = {
  useNewUrlParser: true,
  autoIndex: false,
  // reconnectTries: 30,
  // reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useCreateIndex: true,
  useUnifiedTopology: true
};
connection.establishConnection = async()=>{
  const dburl = 'mongodb://localhost:27017/origa';
 console.log(`MongoDB url  ${dburl}`)
 console.log(`MongoDB connection Initiated`)
  mongoose
    .connect(dburl, options)
    .then(() => {
     console.log(`MongoDB is connected`)
    })
    .catch(err => {
      console.log(err.message ? err.message : "Mongodb connection error")
      setTimeout(connection.establishConnection, retryIntervalInMS);
    });
};

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(`Mongoose default connection disconnected through app termination`)
    process.exit(0);
  });
});

module.exports=connection

const mongoose = require("mongoose");
const MONGODB_URL = process.env;
// this is a method we have created exports.connect
exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      // we have to write this (default option in mongoDB)
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Db connected sucessfully"))
    .catch((error) => {
      console.log("Db connection fail ");
      console.log(error);
      // read about this
      process.exit(1);
    });
};

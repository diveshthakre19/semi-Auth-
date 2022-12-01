const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});

// we have to export userSchema
// mongoDB don't have casing it stores thins in small caps for every collection it will add s in user => users.
module.exports = mongoose.model("user", userSchema);

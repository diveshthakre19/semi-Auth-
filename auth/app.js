// in order to start this app i want to start Database
require("./config/database").connect(); //this is method we have created
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

// import model - User
const User = require("./model/user"); // this User has access to mongoose
const app = express();
app.use(express.json()); // consider these as an syntax we will study this later
app.use(express.urlencoded({ extended: true })); // from express docs

app.get("/", (req, res) => {
  res.send("hello auth system");
});
// create a registration route
// collect all info from front end

//app.post() because some data is about to come.
app.post("/register", async (req, res) => {
  try {
    // collect all info
    const { firstname, lastname, email, password } = req.body; // this coud be undefined
    // validte data if exists
    if (!(email && password && firstname && lastname)) {
      res.status(401).send("all fields are required ");
    }
    //TODO: check if user is in correct format (use express validator)

    // check if user exists or not
    // to check i have to connect with database
    // querry
    const existingUser = await User.findOne({ email }); // can be written as  {email:email} inside findone
    if (existingUser) {
      res.status(401).send("user already found in DB ");
    }
    // encrypt the password   // bcryptjs
    const myEnncrypassword = await bcrypt.hash(password, 10);
    // send it to dm and create user
    // create a new entry in DB
    // this user is diffrent this user it is a big object which stores information in mongoDB
    // User.save() can also be there
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: myEnncrypassword,
    });
    // create a token and send it to user  eith jsonwebtoken
    const token = jwt.sign({ id: user._id, email }, "shhhh", {
      expiresIn: "2h",
    });
    user.token = token; // this token is not in the data base
    user.password = undefined; // because i dont want to send the password
    //i want to send him user and the token
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    console.log("error in response route");
  }
});

//
app.post("/login ", async (req, res) => {
  try {
    // collect information from front end
    const { email, password } = req.body;
    // validate
    if (!email && password) {
      req.status(401).send("email and password is required ");
    }
    // check user in data base
    const user = await User.findOne({ email });
    // if user dose not exist
    // match the passwork
    if (user && (await bcrypt.compare(password, User.password))) {
      // create a token an send
      const token = jwt.sign({ id: user._id, email }, "shhhh", {
        expiresIn: "2h",
      }); // secret shoud be a variable
      user.password = undefined;
      user.token = token;

      // create cookies
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3600000
        httpOnly: true,
      };
      //  send response
      res.status(200).cookie("tooken", token, options).json({
        success: true,
        token,
        user,
      });
    }
    res.sendStatus(400).send("email or password is incorrect ");
  } catch (error) {
    console.log(error);
  }
});

// i want to make a page dashboard  an duser should be able to access the dashboard
app.get("/dashboard", (req, res) => {
  // how to access users cookies in express
  // cookie-parser
  console.log(res.cookies);
  const token = req.cookies;
});

//skiping the part of listening right now.

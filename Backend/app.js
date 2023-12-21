const express = require("express");
const app = express();
const path = require("path");
const PORT = 4444;
const mongoose = require("mongoose");
const session = require('express-session');
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');

// Load environment variables from a .env file if you're using it
require('dotenv').config();
app.use(cookieParser())
app.use(express.json());

  
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}))


 app.use("/api/users",require("./routes/user"));
 app.use("/api/auth",require("./routes/auth")); 
 app.use("/api/tweets",require("./routes/tweet"));

 mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    })

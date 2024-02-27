const express = require('express') //npm i express cors
const cors = require('cors')
const app = express(); //to use express
const port = 3000;
require('dotenv').config()

const passport = require('passport')
const passportSetup = require('./comp/passport')
const protRoute = require('./routes/protected')

//jwt 
const jwt =require('jsonwebtoken')
//routes
const authRoute = require("./routes/auth")
const adminRoute = require("./routes/admin")

//session para sa google oauth
const session = require("express-session")

//for cookie req
const cookieParser = require('cookie-parser')

//for body  parser
const bodyParser = require('body-parser');

//mongoose db
const mongoose = require('mongoose')
const connectionString = process.env.MONGO_CONNECTION_STRING

app.set('trust proxy', 1);

app.use(cookieParser())   
app.use(bodyParser.json()); 

const sessionSecure=()=>{
    return process.env.CYLIC_URL === `http://localhost:3000` ? true : false
}

//use session
app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: sessionSecure(), // Set to true if using HTTPS in production
        maxAge: 60 * 60 * 1000, // Set cookie expiration time (1 hour)
      },
}))

app.use(passport.initialize())
app.use(passport.session())


//to whitelist urls
const corsOptions =
    {
        origin: `${process.env.CLIENT_URL}`,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    }

app.use(cors(corsOptions))

app.use("/auth", authRoute)

app.use("/prot", protRoute)

app.use("/priv", adminRoute)

mongoose.connect(`${connectionString}test`)
    .then((result)=>app.listen(port,()=> console.log(`running in port ${port}`))) //run the port in 3000
    .catch(err=>{console.log(err)})

app.get("/", (req,res)=>{
    res.status(200).json("successfully running")
})

app.use((req, res)=>{
    //if you made a mistake on typing the url
    res.status(404).send(`<h1>WRONG URL!</h1>`)
})
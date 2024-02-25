const express = require('express') //npm i express cors
const cors = require('cors')
const app = express(); //to use express
const port = 3000;
require('dotenv').config()

const protRoute = require('./routes/protected')

const passport = require('passport')

//jwt 
const jwt =require('jsonwebtoken')

//passport.js file
const passportSetup =require('./comp/passport')
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

//use session
app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    sameSite: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser())    

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

app.use("/", (req,res)=>{
    res.status(200).json("successfully running")
})

app.use((req, res)=>{
    //if you made a mistake on typing the url
    res.status(404).send(`<h1>WRONG URL!</h1>`)
})
const express = require('express') //npm i express cors
const cors = require('cors')
const app = express(); //to use express
const port = 3000;
require('dotenv').config()

const protRoute = require('./routes/protected')
//const MongoStore = require('connect-mongo')

const passport = require('passport')

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

//jwt 
const jwt =require('jsonwebtoken')

//to whitelist urls
const corsOptions =
    {
        origin: `${process.env.CLIENT_URL}`,
        methods: ['GET', 'PUT', 'POST'],
        credentials: true,
    }

app.use(cors(corsOptions))

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser())

mongoose.connect(`${connectionString}test`)
    .then((result)=>app.listen(port,()=> console.log(`running in port ${port}`))) //run the port in 3000
    .catch(err=>{console.log(err)})

const sessionSecure=()=>{
    if(process.env.SERVER_URL === `http://localhost:3000`){
        return false
    }
    else{
        return true
    }
}
console.log('secure: ',sessionSecure())
//use session
app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    /*
    store: MongoStore.create({
        mongoUrl: `${connectionString}test`,
        ttl: 10 * 60,
        autoRemove: true
    }),
    */
    cookie: {
        secure: true, //sessionSecure(), // true mo to if prod na
        expires: 60 * 60  //1 hour
    }
}))    
    
app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRoute)

app.use("/prot", protRoute)

app.use("/priv", adminRoute)

app.use("/", (req,res)=>{
    res.status(200).json("successfully running")
})

app.use((req, res)=>{
    //if you made a mistake on typing the url
    res.status(404).send(`<h1>WRONG URL!</h1>`)
})
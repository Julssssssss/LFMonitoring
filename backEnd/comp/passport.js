const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport =require('passport')
const findOrCreateUser = require('./findOrCreateUser')
const logger = require('./logger')

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
            scope:["email", "profile"],
            passReqToCallback: true,
            
        },
        function (req, accessToken, refreshToken, profile, done){
            try{
                const {sub, name, picture, email} = profile._json
                const user = {sub, name, picture, email}
                req.session.userId = sub
                //res.cookie('userId', sub, { httpOnly: true, secure: true, maxAge: 60*60*1000, path: '/' })
                console.log(req.session)
                findOrCreateUser(user, done);
            }
            catch(err){
                console.log(err)
                console.error(err);
                done(err, null);
            }
        }
    )
)
/*
passport.serializeUser((user, done)=>{
    try{
        console.log('serialize', user)
        done(null, user)
    }
    catch(err){
        console.log(err)
    }
})

passport.deserializeUser((user, done)=>{
    try{
        console.log('deserialize', user)
        done(null, user)
    }
    catch(err){
        console.log(err)
    }
})
*/

passport.serializeUser((user, done)=>{
    try{
        //console.log('serialize', user)
        done(null, user)
    }
    catch(err){
        console.log(err)
    }
})

passport.deserializeUser((user, done)=>{
    try{
        //console.log('deserialize', user)
        done(null, user)
    }
    catch(err){
        console.log(err)
    }
})
const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport =require('passport')
const findOrCreateUser = require('./findOrCreateUser')

passport.serializeUser((user, done)=>{
    try{
        console.log('serialize', user)
        done(null, user)
    }
    catch(err){
        console.log(err)
    }
    //gtry
})
/*
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
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
            scope:["email", "profile"],
        },
        function (accessToken, refreshToken, profile, done){
            try{
                const {sub, name, picture, email} = profile._json
                const user = {sub, name, picture, email}
                //console.log(user)
                findOrCreateUser(user, done);
            }
            catch(err){
                console.log(err)
            }
        }
    )
)

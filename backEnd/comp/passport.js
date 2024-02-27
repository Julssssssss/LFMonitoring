const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport =require('passport')
const findOrCreateUser = require('./findOrCreateUser')


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
            scope:["email", "profile"],
            session: true
        },
        function (accessToken, refreshToken, profile, done){
            const {sub, name, picture, email} = profile._json
            const user = {sub, name, picture, email}
            //findOrCreateUser(user, done);
            done(null, sub)
        }
    )
)

passport.serializeUser((user, done)=>{
    try{
        console.log('serialize')
        console.log(user)
        done(null, user)
    }
    catch(err){
        console.log(err)
    }
})

passport.deserializeUser((user, done)=>{
    try{
        console.log('deserialize')
        console.log(user)
        done(null, user)
    }
    catch(err){
        console.log(err)
    }
})
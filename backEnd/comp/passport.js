const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport =require('passport')
const findOrCreateUser = require('./findOrCreateUser')


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `${process.env.CYCLIC_URL}/auth/google/callback`,
            scope:["email", "profile"],
        },
        function (accessToken, refreshToken, profile, done){
            const {sub, name, picture, email} = profile._json
            const user = {sub, name, picture, email}
            //findOrCreateUser(user, done);
            done(null, user)
        }
    )
)

passport.serializeUser(async(user, done)=>{
    await user
    try{
        console.log('serialize')
        console.log(user)
        done(null, user.id)
    }
    catch(err){
        console.log(err)
    }
})

passport.deserializeUser(async(user, done)=>{
    await user
    try{
        console.log('deserialize')
        console.log(user)
        done(null, user)
    }
    catch(err){
        console.log(err)
    }
})
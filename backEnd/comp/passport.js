const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport =require('passport')
const findOrCreateUser = require('./findOrCreateUser')
const logger = require('./logger')

passport.serializeUser((user, done)=>{
    logger.debug('User before serialization:', user);
    try {
      done(null, user);
    } catch (error) {
      logger.error('Error during serialization:', error);
      done(error, null); // Pass the error to the next middleware
    }
})
passport.deserializeUser(async(user, done)=>{
    logger.debug('User before Deserialization:', user);
    try {
      done(null, user);
    } catch (error) {
      logger.error('Error during Deserialization:', error);
      done(error, null); // Pass the error to the next middleware
    }
})

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

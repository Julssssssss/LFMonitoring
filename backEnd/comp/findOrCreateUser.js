const User = require('../Models/userModels')
const jwtRefreshToken = require('../Models/refreshTokenModels')
const jwt = require('jsonwebtoken')

const findOrCreateUser = async (profile, done) => {
    try {
      // Find the user based on the provider ID
      let user = await User.findOne({ 'Email': profile.email });
      const {sub, name, email, picture} = profile

      if (user === null) {
        user = new User({
          _id: sub,
          Name: name,
          Email: email,
          Picture: picture,
          Role: 'user', 
          TAC: false
          // Add any other relevant fields from the profile
        });
        await user.save();
      } 
        //logger.debug('findOrCreateUser', user)
        return done(null, sub);
        //return null
    }
    catch (error) {
      return done(error);
    }
  };
  module.exports = findOrCreateUser
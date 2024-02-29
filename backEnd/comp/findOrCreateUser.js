const User = require('../Models/userModels')
const jwtRefreshToken = require('../Models/refreshTokenModels')
const jwt = require('jsonwebtoken')

const addRefreshToken = async(_id,  refreshToken) =>{
  let user = await jwtRefreshToken.findOneAndDelete({ 'Email': Email })

  refreshToken = new jwtRefreshToken({
    _id: id,
    refreshToken: refreshToken
  });
  refreshToken.save();
}

const createToken = (user, profile)=>{
  const {_id, Name, Email, Role, TAC}=user
  const {picture} = profile
    const data = {_id, Name, Email, Role, TAC, picture}
    // If user exists, return the user
    //wag kalimutan palitan 60s
    //const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '10s'})
    //const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {expiresIn: '1hr'})
    addRefreshToken(refreshToken, Email)
    return null
}

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
        return done(null, sub);
    }
    catch (error) {
      return done(error);
    }
  };
  module.exports = findOrCreateUser
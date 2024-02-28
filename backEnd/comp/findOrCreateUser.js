const User = require('../Models/userModels')
const jwtRefreshToken = require('../Models/refreshTokenModels')
const jwt = require('jsonwebtoken')

const addRefreshToken = async(refreshToken, Email) =>{
  let user = await jwtRefreshToken.findOneAndDelete({ 'Email': Email })

  refreshToken = new jwtRefreshToken({
    Email: Email,
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
    const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '120s'})
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {expiresIn: '1hr'})
    addRefreshToken(refreshToken, Email)
    const token = {
      "id": _id,
      'accessToken': accessToken,
      'refreshToken': refreshToken,
      'role' : data.Role,
      'picture': picture, 
      'TAC': TAC
    }
    return token
}

const findOrCreateUser = async (profile, done) => {
    try {
      const {sub, name, picture, email,} = profile
      // Find the user based on the provider ID
      let user = await User.findOne({ 'Email': email });
  
      if (user) {
        const token = createToken(user)
        //console.log('findorcreate', token)
        return done(null, token);
      } else {
        // If user doesn't exist, create a new user
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

        //const newUser = true
        const token = createToken(user)
        //console.log('findorcreate', token)
        return done(null, token);
      }
    } catch (error) {
      return done(error);
    }
  };
  module.exports = findOrCreateUser
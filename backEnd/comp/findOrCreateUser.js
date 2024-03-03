const User = require('../Models/userModels')
const jwtRefreshToken = require('../Models/tempModel')
const Temp = require('../Models/tempModel')
/*
const jwt = require('jsonwebtoken')

const addRefreshToken = async(refreshToken, Email) =>{
  let user = await jwtRefreshToken.findOneAndDelete({ 'Email': Email })

  refreshToken = new jwtRefreshToken({
    Email: Email,
    refreshToken: refreshToken
  });
  refreshToken.save();
}

const createToken = (user)=>{
  const {_id, Name, Email, Picture, Role, TAC}=user
    const data = {_id, Name, Email, Role, TAC, Picture}
    // If user exists, return the user
    //wag kalimutan palitan 60s
    const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '120s'})
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {expiresIn: '1hr'})
    addRefreshToken(refreshToken, Email)
    const token = {
      "id": _id,
      'accessToken': accessToken,
      'refreshToken': refreshToken,
    }
    return token
}
*/
 //GLOBAL VARIABLE MAAACCESS NG LAHAT
//PAG PINASOK MO SA MGA ANY OPEN AND CLOSE PARENTHESIS, BRACKETS, CURLY BRACES IS MAGIGING LOCAL
//AT YUNG LOCAL IS MAGAGAMIT MO LANG SA LOOB NG LOCAL ENVIRONMENT KAYA NGA LOCAL
const findOrCreateUser = async (profile, done) => {
    try {
      const {sub, name, picture, email} = profile
      //console.log(picture)
      // Find the user based on the provider ID
      let user = await User.findById(sub)
  
      if (!user) {
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
      }
      const temp = new Temp({
        _id: sub,
        Email: email
      })
      await temp.save()
      return done(null, sub);
    } catch (error) {
      return done(error);
    }
  };

  module.exports = findOrCreateUser
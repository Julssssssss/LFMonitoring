const router =require("express").Router()
const passport = require("passport")
const jwt = require('jsonwebtoken')
const jwtRefreshToken = require('../Models/refreshTokenModels')
const userModel = require('../Models/userModels')
const logger = require('../comp/logger')


//TODO: check and fix this
/*
const checkRefToken = async(refreshToken) =>{
    const result = await jwtRefreshToken.findOne({ 'refreshToken': refreshToken })
    if(result){
        //console.log(result)
        return result.Email
    }
    else{
        return 401
    }
}
*/

const deleteRefTokenDb = async(Email)=>{
    await jwtRefreshToken.findOneAndDelete({Email: Email})
    .then(()=>{
        console.log('successfully deleted')
        return null
    })
    .catch((err)=> {console.log(err)})
}

router.post('/refreshToken', async(req, res)=>{
    //console.log(req.cookies)
    const refreshToken =req.cookies
    if(!refreshToken?.jwt) return res.sendStatus(401)
    //console.log(refreshToken.jwt)

    const Email = await checkRefToken(refreshToken.jwt)
        if(Email === 401){
            return res.sendStatus(401)
        }
    jwt.verify (refreshToken.jwt, process.env.JWT_REFRESH_SECRET, (err, user)=>{
        //if expired na refreshToken delete na
        if(err) {
            console.log(Email)
            deleteRefTokenDb(Email)
            return res.status(401)
        }
        const {_id, Name, Email, Role, TAC, Picture}=user
        const data = {_id, Name, Email,TAC, Role, Picture}
        const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '300s'})
        console.log('success')
        res.json({ accessToken: accessToken})
    })
    
})

const addRefreshTokenToDB = async(Email,  refreshToken) =>{
    await jwtRefreshToken.findOne({Email: Email})
    .then((result)=>{
        if(result){
            //console.log(Email)
            deleteRefTokenDb(Email)
        }
        refreshToken = new jwtRefreshToken({
            Email: Email,
            refreshToken: refreshToken
        });
        refreshToken.save();
    })
}

router.get("/login/success", async(req, res)=>{
    console.log('here', req.session)
    if(req.session.userId){
        const userId = req.session.userId
        await userModel.findById(userId)
        .then(async(result)=>{
            //console.log(result)
            const {_id, Name, Email, Picture, Role, TAC} = result;
            const userData = {_id, Name, Email, Picture, Role, TAC}
            const accessToken = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {expiresIn: '300s'})
            const refreshToken = jwt.sign(userData, process.env.JWT_REFRESH_SECRET, {expiresIn: '1hr'}) //1hr
            await addRefreshTokenToDB(Email, refreshToken)
            // Set cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: 'None' });

            // Send response with user data
            res.status(200).json({
                error: false,
                message: "Success",
                accessToken: accessToken,
                role: Role,
                TAC: TAC 
            });
        })
        .catch(err=>{
            console.log(err)
                res.status(500).json({
                error: true,
                message: "Error occured try again later"
            });
        })
    }
    else{
        res.status(203).json({
            error: true,
            message: "walang laman req.user mo lods",
        });
    }
})

router.get("/login/failed", (req, res)=>{
    res.status(401).json({
        error:true,
        message:"Log in failure"
    })
})

router.get("/google", passport.authenticate("google", ["email", "profile"]))

router.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.CLIENT_URL}`,
        failureRedirect: `/login/failed`,
        session: false,
    })
)
router.get("/google", passport.authenticate("google"))

router.get("/logout", async(req, res)=>{
    console.log('cookies', req.cookies)
    const refreshToken = req.cookies.jwt
    const Email = await checkRefToken(refreshToken)
    if(!Email){
        console.error("Error logging out:", err);
        return res.status(500).send("Error logging out");
    }
    await deleteRefTokenDb(Email)
        .then((result)=>{     
            res.clearCookie('connect.sid') 
            res.clearCookie('jwt')  
            req.logout((err)=>{
                if (err) {
                    console.error("Error logging out:", err);
                    return res.status(500).send("Error logging out");
                }
            });    
            res.redirect(process.env.CLIENT_URL)
        })
        .catch((err) => {
            console.error(`error deleting token in database`, err);
            res.sendStatus(500); // Return an appropriate status code in case of error
        });
        
})

module.exports = router
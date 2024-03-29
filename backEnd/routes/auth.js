const router =require("express").Router()
const passport = require("passport")
const jwt = require('jsonwebtoken')
const jwtRefreshToken = require('../Models/refreshTokenModels')
const userModel = require('../Models/userModels')
const writeActLogs = require('../comp/saveToLogs')


//TODO: check and fix this
const checkRefToken = async(refreshToken) =>{
    const result = await jwtRefreshToken.findOne({ 'refreshToken': refreshToken })
    if(result){
        console.log(result.Email)
        return result.Email
    }
    else{
        return 401
    }
}

const deleteRefTokenDb = async(Email)=>{
    await jwtRefreshToken.findOneAndDelete({Email: Email})
    .then((result)=>{
        console.log('successfully deleted')
        return result
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
            return res.sendStatus(403)
        }
        const {_id, Name, Email, Role, TAC, Picture}=user
        const data = {_id, Name, Email,TAC, Role, Picture}
        const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '600s'})
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
        const newRefreshToken = new jwtRefreshToken({
            Email: Email,
            refreshToken: refreshToken, 
        });
        newRefreshToken.save();
    })
}

router.post("/login/success", async(req, res)=>{
    //console.log('here', req.session)
    if(req.session.userId){
        const userId = req.session.userId
        await userModel.findById(userId).lean()
        .then(async(result)=>{
            const {_id, Name, Email, Picture, Role, TAC} = result;
            const userData = {_id, Name, Email, Picture, Role, TAC}
            const accessToken = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {expiresIn: '900'})
            const refreshToken = jwt.sign(userData, process.env.JWT_REFRESH_SECRET, {expiresIn: '960s'}) //15 minutes
            await addRefreshTokenToDB(Email, refreshToken)
            // Set cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true /*sameSite: 'None'*/});
            req.session.userId = null

            //send logs in db if mod or admin
            if(Role === "mod" || Role === "admin"){
                const Activity = `logged in as ${Role}`
                const Details = `NA`   
                writeActLogs(Email, Activity, Details)
            }

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
        failureRedirect: `/auth/login/failed`,
        session: false,
    })
)

router.get("/google", passport.authenticate("google"))

router.get("/logout", async(req, res)=>{
    //console.log('cookies', req.cookies)
    const refreshToken = req.cookies.jwt
    /*
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user)=>{

    })
    */
    console.log(refreshToken)
    const Email = await checkRefToken(refreshToken)
    console.log(Email)
    if(!Email){
        console.error("Error logging out:", err);
        return res.status(500).send("Error logging out");
    }
    deleteRefTokenDb(Email)
    
    await userModel.findOne({Email}, {Role:1, _id: 0})
    .then((result)=> {
        const {Role} = result
        if(Role === "mod" || Role === "admin"){
            const Activity = `logged out as ${Role}`
            const Details = `NA`   
            writeActLogs(Email, Activity, Details)
        }  
    })
    .catch(err=>{
        console.log(err)
    })
    
    req.logout((err)=>{
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).send("Error logging out");
        }
    });    
    res.redirect(process.env.CLIENT_URL)
})

module.exports = router
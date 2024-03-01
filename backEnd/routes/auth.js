const router =require("express").Router()
const passport = require("passport")
const jwt = require('jsonwebtoken')
const jwtRefreshToken = require('../Models/refreshTokenModels')
const userModel = require('../Models/userModels')


//TODO: check and fix this
const checkRefToken = async(refreshToken) =>{
    const token = await jwtRefreshToken.findOne({ 'refreshToken': refreshToken })
    //console.log(token._id)
    if(token){
        console.log(token._id)
        return token._id
    }
    else{
        return 401
    }
}

const deleteRefTokenDb = async(id)=>{
    try{
        await jwtRefreshToken.findByIdAndDelete(id)
        .then(()=>{
            console.log('successfully deleted')
            return null
        })
    }catch(err) {console.log(err)}
}

router.post('/refreshToken', async(req, res)=>{
    //console.log(req.cookies.jwt)
    const refreshToken =req.cookies
    if(!refreshToken?.jwt) return res.sendStatus(401)
    //console.log(refreshToken.jwt)

    const id = await checkRefToken(refreshToken.jwt)
        if(id=== 401){
            return res.sendStatus(401)
        }
    jwt.verify (refreshToken.jwt, process.env.JWT_REFRESH_SECRET, (err, user)=>{
        //if expired na refreshToken delete na
        if(err) {
            console.log(id)
            deleteRefTokenDb(id)
            return res.status(401)
        }
        const {_id, Name, Email, Role, TAC, Picture}=user
        const data = {_id, Name, Email,TAC, Role, Picture}
        const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '300s'})
        console.log('success')
        res.json({ accessToken: accessToken})
    })
})

const addRefreshTokenToDB = async(_id,  refreshToken) =>{
    await jwtRefreshToken.findByIdAndDelete(_id)
    .finally(()=>{
        refreshToken = new jwtRefreshToken({
            _id: _id,
            refreshToken: refreshToken
        });
        refreshToken.save();
    })
}

router.get("/login/success", async(req, res)=>{
    try{
        const userId = req.user
        //console.log('after awaiting', user)
        
        //console.log('jabe', req.session)
        if(userId){
            await userModel.findById(userId)
            .then(async(result)=>{
                //console.log(result)
                const {_id, Name, Email, Picture, Role, TAC} = result;
                const userData = {_id, Name, Email, Picture, Role, TAC}
                const accessToken = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {expiresIn: '300s'})
                const refreshToken = jwt.sign(userData, process.env.JWT_REFRESH_SECRET, {expiresIn: '1hr'}) //1hr
                await addRefreshTokenToDB(_id, refreshToken)
                // Set cookie with refresh token
                res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true });

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
            res.status(403).json({
                error: true,
                message: "Not Authorized",
                errorMSG: error.message
            });
        }
    } catch (error) {
        // If an error occurs, send 403 response
        res.status(403).json({
            error: true,
            message: "Not Authorized",
            errorMSG: error.message
        });
    }
})

router.get("/login/failed", (req, res)=>{
    res.status(401).json({
        error:true,
        message:"Log in failure"
    })
})

router.get("/google/callback",
    passport.authenticate("google", {
        //NOTE!!!! TEMPORARY MUNA SA DASHBOARD IBATO PARA IF EVER IPRESENT PERO BABALIK SA / LANG PARA IAUTH
        successRedirect: `${process.env.CLIENT_URL}`,
        failureRedirect: `/login/failed`,

    })
)
router.get("/google", passport.authenticate("google", ["email", "profile"]))

router.get("/logout", (req, res)=>{
    //console.log('cookies', req.cookies)
    const refreshToken = req.cookies.jwt
    req.logout((err)=>{
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).send("Error logging out");
        }
    });
    deleteRefTokenDb(refreshToken)
        .then((result)=>{     
            
            res.clearCookie('connect.sid') 
            res.clearCookie('jwt')      
            res.redirect(process.env.CLIENT_URL)
        })
        .catch((err) => {
            console.error(`error deleting token in database`, err);
            res.sendStatus(500); // Return an appropriate status code in case of error
        });
})

module.exports = router
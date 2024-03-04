const router =require("express").Router()
const passport = require("passport")
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/userModels')
const Temp = require('../Models/tempModel')
//const jwtRefreshToken = require('../Models/refreshTokenModels')

//TODO: check and fix this
/*
const checkRefToken = async(refreshToken) =>{
    let token = await jwtRefreshToken.findOne({ 'refreshToken': refreshToken });
    if(token){
        return null
    }
    else{
        return 401
    }
}
*/

const deleteRefTokenDb = async(refreshToken)=>{
    try{
        await jwtRefreshToken.findOneAndDelete({ 'refreshToken': refreshToken });
    }catch(err) {console.log(err)}
}

router.post('/refreshToken', async(req, res)=>{
    const refreshToken =req.cookies
    if(!refreshToken?.jwt) return res.sendStatus(401)

    /*const status = await checkRefToken(refreshToken.jwt)
        if(status=== 401){
            return res.sendStatus(401)
        }
        */
    jwt.verify (refreshToken.jwt, process.env.JWT_REFRESH_SECRET, (err, user)=>{
        //if expired na refreshToken delete na
        if(err) {
            //deleteRefTokenDb(refreshToken.jwt)
            return res.sendStatus(404)
        }
        const {_id, Name, Email, Picture, Role, TAC,}=user
        const data = {_id, Name, Email, Picture, TAC, Role}
        const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '300s'})
        res.json({ accessToken: accessToken})
    })
})

const redirectCheck = (req, res, next) => {
    req.isRedirected = req.query.redirected === 'true';
    next(); // Pass control to the next middleware or route handler
  };

router.get("/login/success", redirectCheck, async(req, res)=>{
    if(req.isRedirected){
        //const user = req.user
        //console.log('user', user)
        //const { accessToken, refreshToken, role, TAC } = user;

        // Set cookie with refresh token
        //res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true });
        
        //req.session = {...req.session,"borat": "burikat"} 
        console.log('jabe', req.session)
        console.log(req.headers)
        const latestTemp = await Temp.findOne({}).sort({ _id: -1 }).limit(1)
        await Temp.findByIdAndDelete(latestTemp.id)//dko magawang isa lang ang idelete so yaan mo na hehe
        .then(result=>{
            //console.log(result)
            return
        }) 
        await UserModel.findById(latestTemp.id)
        .then(result=>{
            //console.log(result)
            const {_id, Name, Email, Picture, Role, TAC} = result
            const data = {_id, Name, Email, Picture, Role, TAC}
            const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '300s'})
            const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {expiresIn: '1hr'})
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true })
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
        })
    }
    else{
        // If an error occurs, send 403 response
        res.status(204).json({
            error: true,
            message: "Not Authorized"
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
        //NOTE!!!! TEMPORARY MUNA SA DASHBOARD IBATO PARA IF EVER IPRESENT PERO BABALIK SA / LANG PARA IAUTH
        successRedirect: `${process.env.CLIENT_URL}`,
        failureRedirect: `/login/failed`
    })
)

router.get("/logout", (req, res)=>{
    req.logout((err)=>{
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).send("Error logging out");
        }
    });
    res.clearCookie('jwt')
    res.redirect(process.env.CLIENT_URL)
    /*deleteRefTokenDb(refreshToken)
        .then(()=>{ 
            for (const cookieName in cookies) {
                res.clearCookie(cookieName);
              }
            req.session = null            
        })
        .catch((err) => {
            console.error(`error deleting token in database`, err);
            res.sendStatus(500); // Return an appropriate status code in case of error
        });
        */
})

module.exports = router
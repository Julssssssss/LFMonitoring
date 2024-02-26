const router =require("express").Router()
const passport = require("passport")
const jwt = require('jsonwebtoken')
const jwtRefreshToken = require('../Models/refreshTokenModels')

//TODO: check and fix this
const checkRefToken = async(refreshToken) =>{
    let token = await jwtRefreshToken.findOne({ 'refreshToken': refreshToken });
    if(token){
        return null
    }
    else{
        return 401
    }
}

const deleteRefTokenDb = async(refreshToken)=>{
    try{
        await jwtRefreshToken.findOneAndDelete({ 'refreshToken': refreshToken });
    }catch(err) {console.log(err)}
}

router.post('/refreshToken', async(req, res)=>{
    const refreshToken =req.cookies
    if(!refreshToken?.jwt) return res.sendStatus(401)

    const status = await checkRefToken(refreshToken.jwt)
        if(status=== 401){
            return res.sendStatus(401)
        }

    jwt.verify (refreshToken.jwt, process.env.JWT_REFRESH_SECRET, (err, user)=>{
        //if expired na refreshToken delete na
        if(err) {
            deleteRefTokenDb(refreshToken.jwt)
            return res.sendStatus(401)
        }
        const {_id, Name, Email, Role, TAC, picture}=user
        const data = {_id, Name, Email,TAC, Role, picture}
        const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '120s'})
        res.json({ accessToken: accessToken})
    })
})

router.get("/login/success", (req, res)=>{
    try{
        console.log('user', user)
        //const { accessToken, refreshToken, role, TAC } = user;

        // Set cookie with refresh token
        //res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true });
        
        //req.session = {...req.session,"jwt": user} 
        console.log('jabe', req.session)
        

        // Send response with user data
        res.status(200).json({
            error: false,
            message: "Success",
            userId: user
            /*accessToken: accessToken,
            role: role,
            TAC: TAC */
        });
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

router.get("/google", passport.authenticate("google", ["email", "profile"]))

router.get("/google/callback",
    passport.authenticate("google", {
        //NOTE!!!! TEMPORARY MUNA SA DASHBOARD IBATO PARA IF EVER IPRESENT PERO BABALIK SA / LANG PARA IAUTH
        successRedirect: `${process.env.CLIENT_URL}`,
        failureRedirect: `/login/failed`
    })
)

router.get("/logout", (req, res)=>{
    const cookies =req.cookies
    const refreshToken = cookies.jwt
    req.logout((err)=>{
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).send("Error logging out");
        }
    });
    deleteRefTokenDb(refreshToken)
        .then(()=>{ 
            for (const cookieName in cookies) {
                res.clearCookie(cookieName);
              }
            req.session = null            
            res.redirect(process.env.CLIENT_URL)
        })
        .catch((err) => {
            console.error(`error deleting token in database`, err);
            res.sendStatus(500); // Return an appropriate status code in case of error
        });
})

module.exports = router
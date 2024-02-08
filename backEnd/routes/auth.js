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
        const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '10s'})
        res.json({ accessToken: accessToken})
    })
})

router.get("/login/success", (req, res)=>{
    if(req.user){
        const {accessToken, refreshToken, role, TAC} = req.user
        req.session = null
        
        //send as http only para hindi maaccess through javascript
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 *60 * 1000 })

        res.status(200).json({
            error:false,
            message:"Success",
            accessToken: accessToken,
            role : role, 
            TAC : TAC
        })
    }
    else{
        res.status(403).json({
            error: true,
            message:"Not Authorized"
        })
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
    const cookies =req.cookies
    const refreshToken = cookies.jwt
    deleteRefTokenDb(refreshToken)
        .then(()=>{ 
            for (const cookieName in cookies) {
                res.clearCookie(cookieName);
              }
            req.logout();
            req.session = null            
            res.redirect(process.env.CLIENT_URL)
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500); // Return an appropriate status code in case of error
        });
})

module.exports = router
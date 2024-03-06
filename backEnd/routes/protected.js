const router =require("express").Router()
const jwt = require('jsonwebtoken')

//schemas
const itemModels = require('../Models/itemModels')
const reqModel = require("../Models/requestModels")
const UserModel = require('../Models/userModels')

//to verify token 
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if(token === 'null' ) {return res.sendStatus(401)}
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        req.user= user
        next()
    })
};

router.put("/TACagreement", verifyToken, async(req, res)=>{
    try{
        console.log(req.user)
        const {_id} = req.user
        let Agreed = await UserModel.findByIdAndUpdate({ '_id': _id }, {$set:{TAC:true}})

        return res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
})

//papalitan to ng post mmya pero get muna kasi tinetest placement ng data
router.post("/data", verifyToken, (req, res)=>{
        const {Name, Email, Picture, TAC} = req.user
        const user = {Name, Email}
        if(TAC){
            itemModels.find({})
                .then(result=>{
                    res.status(200).json({
                        items: result,
                        picture: Picture,
                        user: user
                    })
                }
            ).catch(err=>{console.log(err)})
        }
        else{return res.sendStatus(401)}
})

router.post("/request", verifyToken, async(req, res)=>{
    const {itemId} = req.body
    try{
        let item = await itemModels.findOne({ '_id': itemId });

        const {nameItem, _id} = item
        const {Email} = req.user

        if(item == null){return res.sendStatus(403)}

        let repeat = await reqModel.findOne({ 
            'itemId': itemId,
            'Email': Email
        })

        if(repeat){
            return res.sendStatus(200)
        }

        const newReq = new reqModel({
            itemId: _id,
            nameItem: nameItem,
            Email: Email, 
            haveBeenEmailed: false,
        })
        await newReq.save()
        return res.sendStatus(200);
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
    
})



module.exports = router
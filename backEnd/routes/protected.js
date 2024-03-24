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
        if(user.Role != 'user') return res.sendStatus(401)
        req.user= user
        next()
    })
};

router.put("/TACagreement", verifyToken, async(req, res)=>{
    try{
        const {_id} = req.user
        const result = await UserModel.findByIdAndUpdate({ '_id': _id }, {$set:{TAC:true}})
        if(!result){
            res.sendStatus(500)
        }
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
})

//papalitan to ng post mmya pero get muna kasi tinetest placement ng data
router.post("/data", verifyToken, async(req, res)=>{
        console.log(req.body)
        const {_id, Name, Email, Picture} = req.user
        const {TAC} = await UserModel.findById( _id).select('TAC -_id').lean()
        //console.log(TAC)
        const user = {Name, Email}
        if(TAC){
            if('startDate' in req.body && 'endDate' in req.body){
                const {startDate, endDate, currentPage} = req.body 
                itemModels.find({
                    datePosted:{
                        $gte: new Date(startDate), //gte stands for greater than
                        $lt: new Date(endDate).setUTCHours(23, 59, 59, 999) //lt stands for less than
                    }
                }).lean().limit(7).skip((currentPage - 1) * 6).sort({'datePosted': -1}) //waiting na lang sa pagination sa frontEnd
                .then((result) => {
                    const hasNextPage = result.length > 6;
                    const slicedResult = result.slice(0, 6)
                    res.status(200).json({
                      items: slicedResult,
                      user: user,
                      picture: Picture,
                      'hasNextPage': hasNextPage
                    });
                  })
                .catch(err=>{console.log(err)})
            }
            else if('searchQuery' in req.body){
                const {searchQuery, currentPage} = req.body
                itemModels.find({'nameItem': searchQuery.toLowerCase()}).lean().limit(7).skip((currentPage - 1) * 6).sort({'datePosted': -1}) //waiting na lang sa pagination sa frontEnd
                .then((result) => {
                    const hasNextPage = result.length > 6;
                    const slicedResult = result.slice(0, 6)
                    res.status(200).json({
                      items: slicedResult,
                      user: user,
                      picture: Picture,
                      'hasNextPage': hasNextPage
                    });
                })
                .catch(err=>{console.log(err)})
            }
            else{
                const {currentPage} = req.body
                //console.log(currentPage)
                itemModels.find({}).lean().limit(7).skip((currentPage - 1) * 6).sort({'datePosted': -1}) //waiting na lang sa pagination sa frontEnd
                .then((result) => {
                    const hasNextPage = result.length > 6;
                    const slicedResult = result.slice(0, 6)
                    res.status(200).json({
                      items: slicedResult,
                      user: user,
                      picture: Picture,
                      'hasNextPage': hasNextPage
                    });
                  })
                .catch(err=>{console.log(err)})
            }
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
            dateRequested: new Date(),
        })
        await newReq.save()
        return res.sendStatus(200);
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
    
})



module.exports = router
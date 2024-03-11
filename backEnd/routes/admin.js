const router = require('express').Router();
const itemModels = require('../Models/itemModels');
const reqModels = require('../Models/requestModels')
const userModels = require('../Models/userModels')
const transModels = require("../Models/completedTrans")
const unclaimedItemsModels = require('../Models/unclaimedItems')
const writeActLogs = require('../comp/saveToLogs')

const jwt = require('jsonwebtoken');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const nodemailer = require("nodemailer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'FoundItems',
    format: async (req, file) => 'jpg', 
    public_id: (req, file) => 'Item' + Date.now(),
  }
})
const upload = multer({storage: storage})


const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  if (token === 'null' || token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      console.log('error');
      return res.sendStatus(403)
    };   
    if (user.Role !== 'admin' && user.Role !== 'mod') {return res.sendStatus(401)};
    req.user = user
    next();
  });
};

const adminOnlyToken = (req, res, next) => {
  //console.log(req.session)
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  if (token === 'null' || token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    };
    if (user.Role !== 'admin') {return res.sendStatus(401)};
    req.user = user
    next();
  });
};

router.post('/data', verifyToken, async(req, res) => {
  if (req.user) {
    const { Name, Email, Picture, Role } = req.user;
    const user = {Name, Email}
    await itemModels.find({})
    .then((result) => {
      res.status(200).json({
        items: result,
        user: user,
        picture: Picture,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  }
  else {
    return res.sendStatus(403);
  }
});

router.post('/archiveLength', verifyToken, async(req, res)=>{
  try{
    const archiveData = await transModels.find()
    //console.log(archiveData.length)
    res.status(200).json(archiveData.length)
  }catch(err){
    console.log(err)
    res.sendStatus(500)
  }
})

//find userdata
//action search kasi to e
router.post('/userData', adminOnlyToken, async(req, res)=>{
  if(req.body){
    //console.log(req.user)
    const {Email} = req.body
    const Activity = `searched for ${Email}`
    const Details = null
    writeActLogs(req.user.Email, Activity, Details)

    const result = await userModels.findOne({'Email': Email})
    if (result){
      const {Email, Role} = result
      res.status(200).json(
        {
          'Email':Email,
          'Role': Role
        }
      )
    }
    else{
      res.sendStatus(200)
    }
  }
  else{
    res.sendStatus(500)
  }
})


//set ROles

router.post('/setRoles', adminOnlyToken, async(req, res, next) => {
  if(req.body){
    //console.log(req.body)
    const {Email, roleToChange}=req.body
    const Activity = `changed the role of ${Email} to ${roleToChange}`
    const Details = null
    writeActLogs(req.user.Email, Activity, Details)
    //console.log(roleToChange)
    const result = await userModels.updateOne({ 'Email': Email }, {$set:{Role:roleToChange}})
    res.status(200).json("success")
  }
  else{
    res.statusCode(500)
  }
});


// for add item button 
router.post('/sendItem', verifyToken, upload.array('image'), async (req, res) => {
  try {
    const data = req.user
    
    const { Email } = data;
    console.log('here', Email)
    const { nameItem, desc, found, surrenderedBy, datePosted } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const uploadedImages = req.files.map((file) => file.path);

    const uploadItem = new itemModels({
      url: uploadedImages,
      nameItem,
      desc,
      found,
      surrenderedBy,
      postedBy: Email,
      datePosted,
      resolve: false,
    });

    await uploadItem.save()
    .then(res=>{
      //console.log(res)
      const Activity = `added an item`
      const Details = res   
      writeActLogs(Email, Activity, Details)
    })
    .catch(err=>{
      console.log(err)
      res.sendStatus(500)
    })
    res.status(200).json({ success: true, images: uploadedImages })
  } catch (error) {
    console.error('Error during upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// for edit button, updates the image 
//EDDIT BUTTON
router.post('/update/image', verifyToken, upload.array('image'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      console.log('file', file)
      try {
        uploadedImages.push(file.path);
      } catch (uploadError) {
        console.error('Error uploading to Cloudinary:', uploadError);
        return res.status(500).json({ error: 'Error uploading to Cloudinary' });
      }
    }
    
    // Send the array of image URLs to the frontend
    res.json({ images: uploadedImages });

  } catch (error) {
    console.error('Error updating:', error);
    res.status(500).json({ error: 'Error updating data' });
  }
});

// update or edit data to mongodb 
router.put('/update/data/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { url, nameItem, desc, found, surrenderedBy, datePosted } = req.body;

    const updateItem = await itemModels.findByIdAndUpdate(
      id,
      { url, nameItem, desc, found, surrenderedBy, datePosted },
      { new: true }
    );
    console.log(updateItem)
    const Activity = `edited an item`
    const Details = updateItem   
    writeActLogs(req.user.Email, Activity, Details)
    res.json(updateItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// archive unclaimed items 
router.post('/archive/UnclaimedItems/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const sourceItem = await itemModels.findById(id);
    const {url, nameItem, desc, found, surrenderedBy, postedBy, datePosted, approved} = sourceItem
    
    const moveItem = new unclaimedItemsModels({
      "url": url,
      "nameItem": nameItem,
      "found": found,
      "surrenderedBy":surrenderedBy,
      "postedBy":postedBy,
      "datePosted":datePosted,  
      "approved": approved, 
    })
    await moveItem.save()
    .then(result=>{
      const Activity = `archived an item`
      const Details = result   
      writeActLogs(req.user.Email, Activity, Details)
    })
    await itemModels.findByIdAndDelete(id);
    res.json(moveItem)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//delete data to mongodb 
router.post('/delete/:id', verifyToken, async (req, res) => {
  try {
    
    const { id } = req.params;
    const {data} = req.body;
    console.log('here', data)
    const { url } = data
    const extractUrl = (url) => {
      const match = url.match(/\/(FoundItems\/Item\d+)\.jpg$/);
      return match ? match[1] : null;
    };
    const publicIds = url.map(extractUrl);

    const deletionResults = await Promise.all(publicIds.map(async (publicId) => {
      const cloudinaryResponse = await cloudinary.uploader.destroy(publicId);
      return { publicId, result: cloudinaryResponse.result };
    }));

    console.log('Deletion Results:', deletionResults);

    const deletedItem = await itemModels.findOneAndDelete({ _id: id });

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    else{
      const Activity = `deleted an item`
      const Details = deletedItem   
      writeActLogs(req.user.Email, Activity, Details)
    }

    res.json(deletedItem);
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

//request data
router.post('/reqList', verifyToken, async (req, res, next)=>{
  try{
    reqModels.find({})
    .then(result=>{
      res.status(200).json({
        'reqList': result
      })
    })
  }
  catch(err){
    console.log(err)
    res.sendStatus(500)
  }
})

//route for archiving completed transactions

router.post('/ArchivingTrans', verifyToken, async(req, res, next)=>{
  try{
    const {Request} = req.body
    const {_id, itemId, Email}= Request
    //console.log('itemId', itemId)
    const itemDel = await itemModels.findOne({'_id': itemId})
    //console.log(itemDel)
    if(itemDel === null){
      res.status(404).json({error: 'data not found'})
    }
    else{
      const {url, nameItem, desc, found, surrenderedBy, datePosted, postedBy}= itemDel
      const currentDate = new Date();
      const archData = new transModels({
        "_id": _id,
        "itemId": itemId,
        "itemImages": url,
        "nameItem":  nameItem,
        "desc": desc,
        "found": found,
        "surrenderedBy": surrenderedBy,
        "postedBy": postedBy,
        "datePosted": datePosted,
        "claimedBy": Email,
        "dateClaimed": currentDate,
      })

      await archData.save() 
      .then(async(result)=>{
            console.log(result)
            const Activity = `Approved a transaction`
            const Details = result   
            writeActLogs(req.user.Email, Activity, Details)
          
          await itemModels.findByIdAndDelete({'_id': itemId})
          .then(res=>{
            console.log(res)
            console.log('successFully deleted the item')
            
          })

          const requestDel = await reqModels.findByIdAndDelete({'_id': _id})
          if(requestDel === null){
            res.status(404).json({error: 'data not found'})
          }
          else{
            console.log('successfully deleted the request')
            res.status(200).json('success')
          }
          
        }
      )
      //NOTE: TANGALIN LANG TO PAG READY NA ISAVE WALA PA KASI YUNG postedBy DATA AND TINATAMAD AKO MAGDELETE
    }
  }
  catch(err){
    console.log(err)
    res.status(500)
  }
})


//nodemailer 
//to send mails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SERVER_ACC_EMAIL,
    pass: process.env.SERVER_ACC_PASS
  },
});

router.post('/sendEmail', verifyToken, async(req, res, next)=>{
  try{
    const {id, to, subject, text} = req.body;
    console.log(req.body)

    const Activity = `Emailed to  ${to}`;
    const Details = {
      'to': to,
      'subject': subject,
      'text': text
    }
    writeActLogs(req.user.Email, Activity, Details)

    const info = await transporter.sendMail({
      from: process.env.SERVER_ACC_EMAIL,
      to: to,
      subject: subject,
      text: text,
    });
  
    console.log("Message sent: %s", info.messageId);
    await reqModels.findByIdAndUpdate(id, { haveBeenEmailed: true });
    res.status(200).json('success');
  }
  catch(err){
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/delReq', verifyToken, async(req, res, next)=>{
  try{
    
    const {data} = req.body
    await reqModels.findByIdAndDelete(data)
    .then((result)=>{
      //console.log(result)
      const Activity = `deleted the request of ${result.Email}`;
      const Details = result
      writeActLogs(req.user.Email, Activity, Details)
      res.status(200).json('success')
    })
    .catch(err=>{
      console.log(err) 
      res.sendStatus(404)
    })
  }
  catch(err){
    console.log(err) 
    res.sendStatus(500)
  }

})

router.post('/historyLogs', verifyToken, async(req, res, next)=>{
  await  logsModels.find({}).lean().limit(5)
  .then(result=>{
    res.status(200).json(result)
  })
  .catch(err=>{
    console.log(err)
  })
})

module.exports = router;

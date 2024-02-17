const router = require('express').Router();
const itemModels = require('../Models/itemModels');
const reqModels = require('../Models/requestModels')
const userModels = require('../Models/userModels')
const transModels = require("../Models/completedTrans")
const unclaimedItemsModels = require('../Models/unclaimedItems')

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
      return res.sendStatus(403)};
    const { Role, picture } = user;
    if (Role !== 'admin' && Role !== 'mod') {return res.sendStatus(401)};
    req.user = {
      user: user,
      picture: picture
    };
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
      return res.sendStatus(403)};
    const { Role, picture } = user;
    if (Role !== 'admin') {return res.sendStatus(401)};
    req.user = {
      user: user,
      picture: picture
    };
    next();
  });
};

router.post('/data', verifyToken, (req, res) => {
  if (req.user) {
    const { user, picture } = req.user;
    itemModels
      .find({})
      .then((result) => {
        res.status(200).json({
          items: result,
          user: user,
          picture: picture,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } else {
    return res.sendStatus(403);
  }
});

//find userdata

router.post('/userData', adminOnlyToken, async(req, res)=>{
  if(req.body){
    const {Email} = req.body
    if (Email == null || Email == "") {res.sendStatus(404)}

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
      res.sendStatus(404)
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
    const { user: { Email }} = data;

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

    await uploadItem.save();

    res.status(200).json({ success: true, images: uploadedImages });
  } catch (error) {
    console.error('Error during upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// for edit button, updates the image 
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
    await moveItem.save();
    await itemModels.findByIdAndDelete(id);
    res.json(moveItem)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//delete data to mongodb 
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;

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
    const {_id, itemId, nameItem, Email}= Request
    const transacID = _id
    const itemDel = await itemModels.findOne({'_id': itemId})
    if(itemDel === null){
      res.status(404).json({error: 'data not found'})
    }
    else{
      const data = req.user
      const { user: { Email:postedBy }} = data;
      const {_id, url, nameItem, desc, found, surrenderedBy, datePosted}= itemDel
      const itemId = _id.toString()
      const currentDate = new Date();
      const archData = new transModels({
        "_id": transacID,
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
      //NOTE: TANGALIN LANG TO PAG READY NA ISAVE WALA PA KASI YUNG postedBy DATA AND TINATAMAD AKO MAGDELETE

      await itemModels.findByIdAndDelete({'_id': _id})

      const requestDel = await reqModels.findByIdAndDelete({'_id': transacID})
      if(requestDel === null){
        res.status(404).json({error: 'data not found'})
      }

      res.status(200).json('success')
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
    const {id} = req.body
    console.log('eme' ,id)
    const {to, subject, text} = req.body;
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

module.exports = router;

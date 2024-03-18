const router = require('express').Router();
const itemModels = require('../Models/itemModels');
const reqModels = require('../Models/requestModels')
const userModels = require('../Models/userModels')
const transModels = require("../Models/completedTrans")
const unclaimedItemsModels = require('../Models/unclaimedItems')
const logsModels = require('../Models/ActivityLogs')
const writeActLogs = require('../comp/saveToLogs')
const generatePDF = require('../comp/pdfFileMaker')

const fs = require('fs')
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

//lost items data
router.post('/data', verifyToken, async(req, res) => {
  if (req.user) {
    const { Name, Email, Picture, Role } = req.user;
    const user = {Name, Email, Role}
    if('startDate' in req.body && 'endDate' in req.body){
      const {startDate, endDate} = req.body 
      await itemModels.find({
        datePosted:{
          $gte: new Date(startDate), //gte stands for greater than
          $lt: new Date(endDate).setUTCHours(23, 59, 59, 999) //lt stands for less than
        }
      }).lean().sort({'datePosted': -1}) //ok na pagination waiting for frontEnd
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
    else if('searchQuery' in req.body){
      const {searchQuery} = req.body
      console.log(searchQuery)
      await itemModels.find({ 'nameItem': searchQuery}).lean().sort({'datePosted': -1}) //ok na pagination waiting for frontEnd
      .then((result) => {
        console.log(result)
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
    else{
      const {currentPage} = req.body
      await itemModels.find({}).lean().limit(6).skip((currentPage - 1)* 6).sort({'datePosted': -1}) //ok na pagination waiting for frontEnd
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
    const Details = `NA`
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
    const Details = `NA`
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
      datePosted: new Date(),
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

// update or edit data to mongodb 
router.put('/update/data/:id', verifyToken, upload.array('image'), async (req, res) => {
  try {
    const uploadedImages = [];
    const { id } = req.params;
    const { nameItem, desc, found, surrenderedBy, datePosted, OldPic } = req.body;
    const files = req.files || [];
    const oldPicArray = Array.isArray(OldPic) ? OldPic : (OldPic ? [OldPic] : []);

    if (oldPicArray.length > 0 || files.length > 0) {
      uploadedImages.push(...oldPicArray, ...files.map(file => file.path));
    }

   // console.log('Uploaded Images:', uploadedImages);
    const updateItem = await itemModels.findByIdAndUpdate(
      id,
      { 
        url: uploadedImages,
        nameItem, 
        desc, 
        found, 
        surrenderedBy, 
        datePosted: new Date(),
      },
      { new: true }
    );

    console.log('Updated Item:', updateItem);

    const activity = `edited an item`;
    const details = updateItem;
    writeActLogs(req.user.Email, activity, details);

    res.json(updateItem);
  } catch (error) {
    console.error('Error updating item:', error);
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
//set date to string
const dateAndTime = (isoData)=>{
  const Date = isoData.toISOString().split('T')[0]
  const Time = isoData.toTimeString().split(' ')[0]
  const dateAndTimeString = Date +" "+ Time
  //console.log('dateAndTime', dateAndTime)
  return dateAndTimeString
}
//request data
router.post('/reqList', verifyToken, async (req, res, next)=>{
  try{
    console.log(req.body)
    if('startDate' in req.body && 'endDate' in req.body){
      const {startDate, endDate} = req.body
      reqModels.find({
        dateRequested:{
          $gte: new Date(startDate), //gte stands for greater than
          $lt: new Date(endDate).setUTCHours(23, 59, 59, 999) //lt stands for less than
        }
      }).lean().sort({'dateRequested': -1}) //may pagination na waiting na lang sa frontEnd
      .then(result=>{
        const reqList = result.map(elem=>{
          return {
            'id': elem._id,
            "itemId": elem.itemId,
            "Email":elem.Email,
            "haveBeenEmailed": elem.haveBeenEmailed,
            "dateRequested": dateAndTime(elem.dateRequested)
          }
        })
        //console.log(reqList)
        res.status(200).json({
          'reqList': reqList
        })
      })
    }
    else if('searchQuery' in req.body){
      let {searchQuery} = req.body
      reqModels.find({'Email':searchQuery}).lean().sort({'dateRequested': -1}) //may pagination na waiting na lang sa frontEnd
      .then(result=>{
        if(!result){res.json(`request not found`)}
        const reqList = result.map(elem=>{
          //itemModels.findById(elem.itemId).lean()
          return {
            'id': elem._id,
            "itemId": elem.itemId,
            "Email":elem.Email,
            "haveBeenEmailed": elem.haveBeenEmailed,
            "dateRequested": dateAndTime(elem.dateRequested)
          }
        })
        console.log(reqList[0].itemId)
        res.status(200).json({
          'reqList': reqList
        })
      })
    }
    else{
      const {currentPage} = req.body
      console.log('hello')
      await reqModels.find({}).lean().limit(6).skip((currentPage - 1) *5).sort({'dateRequested': -1}) //may pagination na waiting na lang sa frontEnd
      .then(async(result)=>{
        const itemData = await itemModels.findById(result[0].itemId).lean()
        //console.log(itemData)
        const reqListAndItemData = result.map((elem)=>{
            return {
              'id': elem._id,
              "itemId": elem.itemId,
              "Email":elem.Email,
              "haveBeenEmailed": elem.haveBeenEmailed,
              "dateRequested": dateAndTime(elem.dateRequested),
              "itemData": itemData
            }
        })

        res.status(200).json({
          'reqListAndItemData': reqListAndItemData
        })
      })
    }
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
  const {startDate, endDate} = req.body

  await logsModels.find({
    Date:{
      $gte: new Date(startDate), //gte stands for greater than
      $lt: new Date(endDate).setUTCHours(23, 59, 59, 999), //lt stands for less than //set utchours means set time 
    },
  }).lean().sort({'datePosted': -1})
  .then(async(result)=>{
    if(!result) res.json(`there is no data!`)
    const type = `Logs`
    //console.log(result)

    const Activity = `Generated history Logs ranging from ${startDate} to ${endDate}`;
    const Details = `NA`
    writeActLogs(req.user.Email, Activity, Details)

    const pdfData = await generatePDF(type, [result])

    const fileName = `History-Logs-from-${startDate}-to-${endDate}.pdf`
    fs.writeFileSync(fileName, pdfData)
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(pdfData); // Send the PDF data to the frontend?

    // Optionally, delete the temporary file after download
    fs.unlinkSync(fileName);
  })
  .catch(err=>{
    console.log(err)
  })
})

router.post('/archiveDataGenerate', verifyToken, async(req, res, next)=>{

  const {startDate, endDate} = req.body

  await transModels.find({
    dateClaimed:{
      $gte: new Date(startDate), //gte stands for greater than
      $lt: new Date(endDate).setUTCHours(23, 59, 59, 999) //lt stands for less than
    }
  }).lean().sort({'datePosted': -1})
  .then(async(result)=>{
    if(!result) res.json(`there is no data!`)
    console.log(result)

    //generate logs 
    const Activity = `Generated an archiveData for claimed items ranging from ${startDate} to ${endDate}`;
    const Details = `NA`
    writeActLogs(req.user.Email, Activity, Details)

    //generate PDF
    const type = `Archive`
    const pdfData = await generatePDF(type, [result])

    const fileName = `History-Logs-from-${startDate}-to-${endDate}.pdf`
    fs.writeFileSync(fileName, pdfData)
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(pdfData); // Send the PDF data to the frontend?

    // Optionally, delete the temporary file after download
    fs.unlinkSync(fileName);
  })
  .catch(err=>{
    console.log(err)
  })
})

router.post('/genUnfoundItems', verifyToken, async(req, res, next)=>{

  const {startDate, endDate} = req.body
  console.log(req.body)

  await unclaimedItemsModels.find({
    datePosted:{
      $gte: new Date(startDate), //gte stands for greater than
      $lt: new Date(endDate).setUTCHours(23, 59, 59, 999) //lt stands for less than
    }
  }).lean().sort({'datePosted': -1})
  .then(async(result)=>{
    if(!result) res.json(`there is no data!`)
    console.log(result)

    //generate logs 
    const Activity = `Generated an archiveData for unclaimed items ranging from ${startDate} to ${endDate}`;
    const Details = `NA`
    writeActLogs(req.user.Email, Activity, Details)

    //generate PDF
    const type = `unclaimed items`
    const pdfData = await generatePDF(type, [result])

    const fileName = `History-Logs-from-${startDate}-to-${endDate}.pdf`
    fs.writeFileSync(fileName, pdfData)
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(pdfData); // Send the PDF data to the frontend?

    // Optionally, delete the temporary file after download
    fs.unlinkSync(fileName);
  })
  .catch(err=>{
    console.log(err)
  })
})

module.exports = router;

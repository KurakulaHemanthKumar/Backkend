var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require('fs');
var sha1 = require('sha1');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../Services/user');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, 'public/music/uploads')
  },
  filename: (req, file, cb) => {
  cb(null, Date.now() + '-' + file.originalname)
  }
  });

  const upload = multer({ storage }).array('file',5)

  router.post('/register', function (req, res) {
    console.log('xsxsc');
    var e=req.body.email.toLowerCase()
     User.findOne({email:e},function(err,user){
      if(err){
        console.log(error)
      }
      if(user){
        res.status(400).send({
          message:"email already exists"
        })
      }
      else{
        var user =  User.create({
          username:req.body.username,
    phone:req.body.phone,
    email:req.body.email,
    password:req.body.password,
    age:req.body.age,
      },
      function (err, user) {
        
          if (err) console.log(err);
          res.status(200).send({
            data:user,
            message:'registered'
          });
          console.log("post service// "+user)
      });
      }
    })
  
      
  });
  
  router.post('/login', function(req, res){
    var e=req.body.email.toLowerCase()
   User.findOne({ email: e}).then((user) => {  
    console.log("testing" +user)
      var result = {};
      if (!user) {
        console.log('gfd')
         return res.status(404).send({
          message :"Not Found"
         });
      }
   
      if (user.password ==  sha1(req.body.password)) {
          console.log(user._id);
          return res.status(200).send({
          message :"Success",
          id:user._id,
          data:user
  
         });    
           
      } else {
          result.message = "Invalid Password";
          console.log('Invalid pass');
          res.status(404).send(result);
      }
    })
      .catch((err) => {
        console.log(err);
          res.status(500).send(err);
      });
  });

  router.post('/uploadprofilepic',function(req, res) {
   
    upload(req,res,function(err) {
      console.log('******body********')
         console.log(req.body);
          console.log('******file********')
         console.log(req.files);
         if(err) {
             return res.end("Error uploading file.");
         }
          uploadImagePass(req.body.id,req.files)
         res.end("File is uploaded");
     });
 
 });
 
  function uploadImagePass(id,files){
   console.log(id);
   var imgarray=[]
   var jsonObj={images:{
   }}
 for(let i = 0; i < files.length; i++){
  var urlnew='http://192.168.43.173:3000/'+files[i].filename
 
    imgarray.push(urlnew);
  
     var url = "url" + i;
     jsonObj.images[url]=urlnew ;
 
 }
  console.log(jsonObj.images);
    
      User.update({_id:id},{$set:{image:jsonObj.images}}).then((user)=>{
     console.log(user)
   }).catch((err)=>{
    console.log(err)
     
   })
 }


 router.post('/fetchprofile',function (req, res) {
  console.log(req.body.userid)

  User.findOne({_id:req.body.userid}).then((user)=>{
res.status(200).send({
  data:user,
  message:'successs'
})
  }).catch((err)=>{
    res.status(200).send({
      data:err,
      message:'not successs'
    })
  })
});



router.post('/uploadvideo',function(req, res) {
   
  upload(req,res,function(err) {
    console.log('******body********')
       console.log(req.body);
        console.log('******file********')
       console.log(req.files);
       if(err) {
           return res.end("Error uploading file.");
       }
        uploadVideo(req.body.id,req.files)
       res.end("File is uploaded");
   });

});

function uploadVideo(id,files){
 console.log(id);
 var imgarray=[]
 var jsonObj={images:{
 }}
for(let i = 0; i < files.length; i++){
var urlnew='http://192.168.43.173:3000/'+files[i].filename

  imgarray.push(urlnew);

   var url = "url" + i;
   jsonObj.images[url]=urlnew ;

}
console.log(jsonObj.images);
  
    User.update({_id:id},{$set:{image:jsonObj.images}}).then((user)=>{
   console.log(user)
 }).catch((err)=>{
  console.log(err)
   
 })
}




router.post('/updatedetails',function (req, res) {

  if(req.body.token=='passUpdate'){
     console.log('--------------------')
     console.log(req.body)
      User.updateOne({_id:req.body.userid},{$set:{password: sha1(req.body.newpassword)}}).then((user)=>{
    console.log(user);
    res.status(200).send({
  data:user,
  message:'success'
})
  }).catch((err)=>{
   console.log(err)
    res.status(500).send({
      data:err,
      message:'not success'
    })
  })
  }
  else if(req.body.token==='emailUpdate'){
      User.updateOne({_id:req.body.userid},{$set:{email: req.body.newemail}}).then((user)=>{
    console.log(user);
    res.status(200).send({
  data:user,
  message:'success'
})
  }).catch((err)=>{
   console.log(err)
    res.status(500).send({
      data:err,
      message:'not success'
    })
  })
  }
  else{
      User.updateOne({_id:req.body.userid},{$set:{phone:req.body.newnumber}}).then((user)=>{
    console.log(user);
    res.status(200).send({
  data:user,
  message:'success'
})
  }).catch((err)=>{
   console.log(err)
    res.status(500).send({
      data:err,
      message:'not success'
    })
  })
  }}
);




  module.exports = router;
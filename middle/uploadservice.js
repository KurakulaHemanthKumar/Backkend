var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require('fs');
var sha1 = require('sha1');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Upload = require('../Services/Upload');
var Quiz=require('../Services/quiz')
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, 'public/music/uploads')
  },
  filename: (req, file, cb) => {
  cb(null, Date.now() + '-' + file.originalname)
  }
  });

  const upload = multer({ storage }).array('file',5)



  router.post('/createquiz',function(req,res){
    var question=req.body.question
    var option1=req.body.option1
    var option2=req.body.option2
    var option3=req.body.option3
    var option4=req.body.option4
    var ans1=req.body.ans1
    var ans2=req.body.ans2
    var ans3=req.body.ans3
    var ans4=req.body.ans4
    Quiz.create({
        quiz:{
          question:question,
          option1:{
            opt:option1,
            ans:ans1
          },
          option2:{
            opt:option2,
            ans:ans2
          },
          option3:{
            opt:option3,
            ans:ans3
          },
          option4:{
            opt:option4,
            ans:ans4
          }
        }
    },function (err, user) {
        
      if (err) console.log(err);
      res.status(200).send({
        data:user,
        message:'registered'
      });
      console.log("post service// "+user)
  })
  })

  router.post('/getquiz',function (req, res) {
    Quiz.find({}).then((albums)=>{
  res.status(200).send({
    data:albums,
    message:'successs'
  })
    }).catch((err)=>{
      res.status(200).send({
        data:err,
        message:'not successs'
      })
    })
  });


  router.post('/createalbum', function (req, res) {
    // console.log(req);
    var e=req.body.albumname
   Upload.findOne({albumname:e},function(err,album){
    if(err){
      console.log(error)
    }
    if(album){
      res.status(400).send({
        message:"album already exists"
      })
    }
    else{
         var user =  Upload.create({
          albumname : req.body.albumname,
              artist:req.body.artist,  
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
  });
  })


  router.post('/getalbum',function (req, res) {
    Upload.find({}).then((albums)=>{
  res.status(200).send({
    data:albums,
    message:'successs'
  })
    }).catch((err)=>{
      res.status(200).send({
        data:err,
        message:'not successs'
      })
    })
  });

  router.post('/getalbumsongs',function (req, res) {
    Upload.find({_id:req.body.albumid}).then((albums)=>{
  res.status(200).send({
    data:albums,
    message:'successs'
  })
    }).catch((err)=>{
      res.status(200).send({
        data:err,
        message:'not successs'
      })
    })
  });

  
  router.post('/uploadalbumimage',function(req, res) {
   
    upload(req,res,function(err) {
      console.log('******body********')
         console.log(req.body);
          console.log('******file********')
         console.log(req.files);
         if(err) {
             return res.end("Error uploading file.");
         }
          albumimage(req.body.id,req.files)
         res.end("File is uploaded");
     });
 
 });
 
  function albumimage(id,files){
   console.log(id);
   var imgarray=[]
   var jsonObj={images:{
   }}
 for(let i = 0; i < 1; i++){
  var urlnew='http://192.168.43.173:3000/'+files[i].filename
 
//     imgarray.push(urlnew);
  
//      var url = "url" + i;
//      jsonObj.images[url]=urlnew ;
 
 }
//   console.log(jsonObj.images);
    
      Upload.update({_id:id},{$set:{albumimage:urlnew}}).then((user)=>{
     console.log(user)
   }).catch((err)=>{
    console.log(err)
     
   })
 }



//  router.post('/updatealbum',function(req,res){
//    var id=req.body
//  })



  router.post('/uploadfile',function(req, res) {
    console.log(req)
    upload(req,res,function(err) {
       console.log('******body********')
          console.log(req.body);
           console.log('******fileprofile********')
          console.log(req.files);
          if(err) {
              return res.end("Error uploading file.");
          }
           uploadMusic(req.body.id,req.files,req.body.songName)
          res.end("File is uploaded");
      });  
  });


  function uploadMusic(id,files,songName){
    console.log(id);
    console.log(songName);
    var musicarr=[]
    var jsonObj={music:{
    }}
    for(let j=0;j<files.length;j++){
  for(let i = 0; i < 1; i++){
   var urlnew='http://192.168.43.173:3000/'+files[j].filename
  
       Upload.update({_id:id},{$push:{song:{url: urlnew}}}).then((user)=>{
      console.log(user)
    }).catch((err)=>{
     console.log(err)
      
    })
  }
}
}

router.post('/updatealbum',function(req,res){
  Upload.update({_id:req.body.id},{$set:{
    albumname:req.body.albumname,
    artist:req.body.artist,
  }}).then((albums)=>{
    res.status(200).send({
      data:albums,
      message:'successs'
    })
      }).catch((err)=>{
        res.status(200).send({
          data:err,
          message:'not successs'
        })
      })
  
});


router.post('/deletealbum',function (req, res) {
  console.log(req.body.id)

Upload.remove({_id:req.body.id}).then((user)=>{
  console.log(album);
  res.status(200).send({
data:album,
message:'success'
})
}).catch((err)=>{
 
  res.status(500).send({
    data:err,
    message:'not successs'
  })
})

}

);


  module.exports = router;
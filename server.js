// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser')
// var mysql = require('mysql');
// var connect = require("connect");
// //var app = connect().use(connect.static(__dirname + '/public'));
// var connection = mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   password:'hemu9876',
//   database:'medi',  
// });
// var app =express();
// app.use(bodyParser.urlencoded())

// // parse application/json
// app.use(bodyParser.json())

// connection.connect((err)=>{
//   if(err){
//     throw err;
//   }
//   console.log('MySql is connected');
// })

// // app.get('/',function(req,res,next){
// //   connection.query("use login1")
// //   console.log('came here')
// //     res.render('index');

// // });

// app.post('/album',function(req,res,next){
//     var albumid = req.body.albumid;
//     var songid = req.body.songid;
//     var albumname = req.body.albumname;
//     var albumimage = req.body.albumimage;
//     var description=req.body.description;
//     var songtime=req.body.songtime;
//     var subscription = req.body.subscription;
//     var songname =req.body.songname;
//     var songdes=req.body.songdes;
//     connection.query("INSERT INTO album (albumid,songid,albumname,albumimage,description,songtime,subscription,songname,songdes) VALUES(?,?,?,?,?,?,?,?,?)",[albumid,songid,albumname,albumimage,description,songtime,subscription,songname,songdes],function(err,row){
//       if(!err){
//         console.log(row);
        
//         res.send({'success':true,'message':row});
//       }
//       else{
//         console.log(err);
//         res.send({'success':false,message:'user not found'});
 
//       }
    
//       })
// });


// app.post('/getalbum',function(req,res,next){
//     var albumid =req.body.albumid;
//     connection.query("SELECT * FROM album WHERE albumid=?",[albumid],function(err,row,fields){
//        if(!err){
//          console.log(row);
         
//          res.send({'success':true,'message':row});
//        }
//     else{
//          console.log(err);
//          res.send({'success':false,message:'user not found'});
  
//        }
//     });
//    });
// // app.post('/catagories',function(req,res,next){
// //     var catname
// // })

// app.listen('3600', ()=>{
//     console.log('server started on port 3600');
//   });
//   module.exports=router;


var express = require('express');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/public/music/uploads'));
var cors = require('cors');

app.use(cors())
app.use(bodyParser.json({ limit: '500mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.all('*', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
}); 

// var UserController = require('./models/user/UserController');
// var DestinationController = require('./models/user/destinationController');
// var BookingController = require('./models/user/bookingController');
var UploadService = require('./middle/uploadservice');
app.use('/', UploadService);
var port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Listening on port ${port}`));
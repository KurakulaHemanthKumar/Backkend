var mongoose = require('mongoose');
var UploadSchema = new mongoose.Schema({

    
	albumid:String,
	albumname:String,
	songid:String,
    songname: String,
    songtime: String,
    subscription:String,
    artist:String,
    songdescription:String,
    albumimage:{},
    songimage:String,
    like:String,
    song:{
        url:String,
        songname:String
    },
    

    // song:[{url:{},name:String,id:String}],
       

    
});
mongoose.model('Upload', UploadSchema);

module.exports = mongoose.model('Upload');
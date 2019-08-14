var mongoose=require('mongoose');
var UserSchema=new mongoose.Schema({
    username:String,
    phone:String,
    email:String,
    password:String,
    age:String,
    image:{},
    uploads:{},
    streaks:String,
    subscription:String,

});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
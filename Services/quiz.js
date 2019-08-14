var mongoose = require('mongoose');
var QuizSchema = new mongoose.Schema({
    quiz:{
        question:String,
        option1:{
            opt:String,
            ans:Boolean
        },
        option2:{
            opt:String,
            ans:Boolean
        },
        option3:{
            opt:String,
            ans:Boolean
        },
        option4:{
            opt:String,
            ans:Boolean
        }
        
    }
    // song:[{url:{},name:String,id:String}],
       

    
});
mongoose.model('Quiz', QuizSchema);

module.exports = mongoose.model('Quiz');
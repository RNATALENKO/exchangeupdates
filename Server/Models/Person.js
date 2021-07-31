const mongoose = require('mongoose');



const PersonSchema= mongoose.Schema({
    userId:Number,
    name:String,
    age:Number,
    timestamp:Number,
    chosen: {type:Boolean, default:false},
    chooser:{type:Number, default:null},
})



module.exports = mongoose.model("PersonModel", PersonSchema, "People");
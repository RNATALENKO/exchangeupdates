const mongoose = require('mongoose');



const SocketSchema= mongoose.Schema({
    id:{type:Number, required:true},
    socketId:{type:String, required:true}
})



module.exports = mongoose.model("SocketModel", SocketSchema, "Sockets");
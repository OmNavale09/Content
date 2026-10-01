const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
{
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        required:true
    },

    role:{
        type:String,
        enum:["user","assistant"],
        required:true
    },

    text:String,

    images:[
        {
            url:String,
            publicId:String
        }
    ],

    videos:[
        {
            url:String,
            publicId:String
        }
    ],

    response:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Generation"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Message",messageSchema);
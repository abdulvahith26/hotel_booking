const mongoose = require("mongoose")
const hotelSchema = new mongoose.Schema({
    name : {type : String, require : true },
    Location: {type: String, require: true },
    price: {type:Number,require:true},
    rating:{type:Number,require: true},
    description: {type:String ,require:true},
    images: [{type:String}],
    availableRooms:{type:String, require: true},
    amenities:[{type:String}],
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User", required: true },

},
{timestamps: true});
const Hotel = mongoose.model("Hotel",hotelSchema);
module.exports = Hotel;


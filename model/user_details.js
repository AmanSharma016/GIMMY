const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
});

const detail = mongoose.model("detail",detailSchema);
module.exports = detail;
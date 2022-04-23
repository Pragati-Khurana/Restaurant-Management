const  mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
     user_id : {  
       type : Number,
       unique: true,
       required: [true, "Userid must be provided"],

    },

    username : { 
        type: String,
        unique: true,
        required:[true, "Username must be provided"],
    },

    user_password : {
        type: String,
        required:[true, "User password must be provided"],
    },

    contact_number:{
        type: String,
        trim: true,
        required:[true, "contact_number must be provided"],
        // validate: {
        // function (v),
        // return    
        // },
    },

    user_email:{
        type: String,
        trin: true,
        lowercase: true,
        unique: true,
        required: [true, "Email required"],
        validate: function(v) {
        return /^\w+([\,-]?\w+)@\w+([\,-]?\w+)(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
    },
    
    
    
    role: {
        type: String,
        required: [true, "Role is must be provided"],
     },
 },
 {
    timestamps:true
 });
 module.exports = mongoose.model("User", UserSchema);
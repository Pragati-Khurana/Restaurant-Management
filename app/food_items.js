const  mongoose = require("mongoose");

const food_itmesSchema  = new mongoose.Schema({
    food_item_id:{
        type: Number,
        unique: true,
        required:[true, "food_item_id must be provided"],
    },
    food_item_name:{
        type: String,
        unique: true,
        required:[true, "food_item_name must be provided"],
    },
    cat_id : {
        type:  Number,
        ref:"category",
        required:[true, "cat_id must be provided"],
    },
    description:{
        type: String,
        required:[true, "description must be provided"],
    },
    price:{
        type: Number,
        required:[true, "price must be provided"],
    }
 });
 module.exports = mongoose.model("food_items", food_itmesSchema);
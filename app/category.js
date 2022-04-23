const  mongoose = require("mongoose");

const categorySchema  = new mongoose.Schema({
    cat_id : {
        type:  Number,
        unique: true,
        required:[true, "cat_id must be provided"],
    },

    cat_name: {
        type: String,
        required:[true, "cat_name must be provided"],
    },
});
module.exports = mongoose.model("category", categorySchema);
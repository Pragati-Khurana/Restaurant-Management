const  mongoose = require("mongoose");

const invoiceSchema  = new mongoose.Schema ({
    invo:{
        type: Number,
        unique: true,
        required: [true, "invo must be provided"],
    },
    order_id:{
       type : Number,
       unique: true,
       required:[true, "order_id must be provided"],
   },
   date:{
       type: String,
       required:[true, "Date must be provided"],

   },

});
module.exports = mongoose.model("Invoice", invoiceSchema);
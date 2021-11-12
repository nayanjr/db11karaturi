const mongoose = require("mongoose") 
const teaSchema = mongoose.Schema({ 
 tea_brand: String, 
 size: String, 
 price: Number 
}) 
 
module.exports = mongoose.model("Tea", 
teaSchema) 
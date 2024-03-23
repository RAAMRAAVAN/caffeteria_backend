// get schema instance
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create schema
// Create a Mongoose schema and model for persons
// Create a Mongoose schema and model for persons
const itemSchema = new Schema({
  label: String,
  batchNo: String,
  expDate: Date,
  discountApplicable: Boolean,
  purchasePrice: Number,
  MRP: Number,
  GST: Number,
  status: Boolean,
  currentStock: Number
});

const ItemModel = mongoose.model('Item', itemSchema);
// export model
module.exports = ItemModel
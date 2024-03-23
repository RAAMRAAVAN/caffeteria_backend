const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  billno: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  partyno: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  partyName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
  items: {
    type: Array,
    required: true,
    index: true,
  },
  PaidAmount: {
    type: Number,
    // required: true,
    // index: true,
  },
  Cash: {
    type: Number,
    // required: true,
    // index: true,
  },
  Card: {
    type: Number,
    // required: true,
    // index: true,
  },
  Upi: {
    type: Number,
    // required: true,
    // index: true,
  },
  Credit: {
    type: Number,
    // required: true,
    // index: true,
  },
  IUKD: {
    type: Number,
    // required: true,
    // index: true,
  },
  CreditAmount: {
    type: Number,
    required: true,
    index: true,
  },
  ModeOfPayment: {
    type: String,
    required: true,
    index: true,
  },
  BankName: {
    type: String,
    // required: true,
    // index: true,
  },
  TID: {
    type: String,
    // required: true,
    // index: true,
  },
  remark: {
    type: String,
    // required: true,
    // index: true,
  },
  ReferenceNo: {
    type: String,
    // required: true,
    // index: true,
  },
  TotalValue: {
    type: Number,
    required: true,
    index: true,
  },
  TotalGST: {
    type: Number,
    required: true,
    index: true,
  },
  TotalBillValue: {
    type: Number,
    required: true,
    index: true,
  },
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;

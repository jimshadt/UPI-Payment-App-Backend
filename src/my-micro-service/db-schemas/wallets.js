"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
;
let Schema = mongoose.Schema;
let mySchema = new Schema({
    walletName: { type: String, required: true },
    amount: { type: Number, required: true },
    created_by: { type: String },
});
exports.default = mongoose.model('wallets', mySchema);

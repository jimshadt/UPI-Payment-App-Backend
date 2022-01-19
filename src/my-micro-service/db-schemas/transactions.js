"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
;
let Schema = mongoose.Schema;
let mySchema = new Schema({
    from_user: { type: String, ref: "users" },
    to_user: { type: String, ref: "users" },
    transaction_amount: { type: Number },
    before_balance: { type: Number },
    after_balance: { type: Number },
    transaction_id: { type: String },
    upi_id: { type: String },
    isListed: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.default = mongoose.model('transactions', mySchema);

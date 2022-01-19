"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
;
let Schema = mongoose.Schema;
let mySchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, default: 12345 },
    mobile: { type: String },
    created_by: { type: String },
    total_creditline: { type: Number, default: 1000 },
    available_creditline: { type: Number, default: 1000 }
});
exports.default = mongoose.model('users', mySchema);

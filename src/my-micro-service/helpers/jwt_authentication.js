"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function token_creation(args) {
    let token = jwt.sign(args, "secret101");
    return token;
}
exports.default = token_creation;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const send_amount_1 = require("./send_amount");
class Mutations {
    async send_amount(args, req, user) {
        return await send_amount_1.default(args, req, user);
    }
}
exports.default = Mutations;

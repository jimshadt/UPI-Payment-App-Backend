"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const send_amount_1 = require("./send_amount");
const send_money_to_upi_1 = require("./send_money_to_upi");
class Mutations {
    async send_amount(args, req, user) {
        return await send_amount_1.default(args, req, user);
    }
    async send_money_to_upi(args, req, user) {
        return await send_money_to_upi_1.default(args, req, user);
    }
}
exports.default = Mutations;

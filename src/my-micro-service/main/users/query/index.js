"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_login_1 = require("./user_login");
const view_creditline_1 = require("./view_creditline");
const view_transaction_history_1 = require("./view_transaction_history");
class Queries {
    async user_login(args, req) {
        return await user_login_1.default(args, req);
    }
    async view_creditline(args, req, user) {
        return await view_creditline_1.default(args, req, user);
    }
    async view_transaction_history(args, req, user) {
        return await view_transaction_history_1.default(args, req, user);
    }
}
exports.default = Queries;

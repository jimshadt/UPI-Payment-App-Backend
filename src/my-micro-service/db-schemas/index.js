"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admins_1 = require("./admins");
const users_1 = require("./users");
const wallets_1 = require("./wallets");
const transactions_1 = require("./transactions");
class DBInterface {
    constructor() {
        this.admins = admins_1.default;
        this.users = users_1.default;
        this.wallets = wallets_1.default;
        this.transactions = transactions_1.default;
    }
}
exports.default = DBInterface;

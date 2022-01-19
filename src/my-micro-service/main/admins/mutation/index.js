"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_signup_1 = require("./admin_signup");
const admin_wallet_1 = require("./admin_wallet");
const create_user_1 = require("./create_user");
const update_user_1 = require("./update_user");
const remove_user_1 = require("./remove_user");
class Mutations {
    async admin_signup(args, req) {
        return await admin_signup_1.default(args, req);
    }
    async create_user(args, req, user) {
        return await create_user_1.default(args, req, user);
    }
    async admin_wallet(args, req, user) {
        return await admin_wallet_1.default(args, req, user);
    }
    async update_user(args, req, user) {
        return await update_user_1.default(args, req, user);
    }
    async remove_user(args, req, user) {
        return await remove_user_1.default(args, req, user);
    }
}
exports.default = Mutations;

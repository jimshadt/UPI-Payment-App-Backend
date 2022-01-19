"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_login_1 = require("./admin_login");
const list_users_1 = require("./list_users");
const wallet_listing_1 = require("./wallet_listing");
const view_transaction_history_of_user_1 = require("./view_transaction_history_of_user");
const list_transactions_1 = require("./list_transactions");
const transaction_details_1 = require("./transaction_details");
class Queries {
    async admin_login(args, req) {
        return await admin_login_1.default(args, req);
    }
    async wallet_listing(args, req, user) {
        return await wallet_listing_1.default(args, req, user);
    }
    async list_users(args, req, user) {
        return await list_users_1.default(args, req, user);
    }
    async view_transaction_history_of_user(args, req, user) {
        return await view_transaction_history_of_user_1.default(args, req, user);
    }
    async list_transactions(args, req, user) {
        return await list_transactions_1.default(args, req, user);
    }
    async transaction_details(args, req, user) {
        return await transaction_details_1.default(args, req, user);
    }
}
exports.default = Queries;

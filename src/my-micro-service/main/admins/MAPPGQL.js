"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./query");
const mutation_1 = require("./mutation");
const Decorators_1 = require("../../Decorators");
class MAPPGQL {
    constructor(params) {
        this.adminQueries = new query_1.default();
        this.adminMutations = new mutation_1.default();
        this.params = params;
    }
    async health() {
        return { status: "ok" };
    }
    async admin_signup(args, req) {
        return await this.adminMutations.admin_signup(args, req);
    }
    async admin_login(args, req) {
        return await this.adminQueries.admin_login(args, req);
    }
    async create_user(args, req, user) {
        return await this.adminMutations.create_user(args, req, user);
    }
    async admin_wallet(args, req, user) {
        return await this.adminMutations.admin_wallet(args, req, user);
    }
    async wallet_listing(args, req, user) {
        return await this.adminQueries.wallet_listing(args, req, user);
    }
    async list_users(args, req, user) {
        return await this.adminQueries.list_users(args, req, user);
    }
    async update_user(args, req, user) {
        return await this.adminMutations.update_user(args, req, user);
    }
    async remove_user(args, req, user) {
        return await this.adminMutations.remove_user(args, req, user);
    }
    async view_transaction_history_of_user(args, req, user) {
        return await this.adminQueries.view_transaction_history_of_user(args, req, user);
    }
    async list_transactions(args, req, user) {
        return await this.adminQueries.list_transactions(args, req, user);
    }
    async transaction_details(args, req, user) {
        return await this.adminQueries.transaction_details(args, req, user);
    }
}
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "create_user", null);
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "admin_wallet", null);
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "wallet_listing", null);
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "list_users", null);
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "update_user", null);
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "remove_user", null);
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "view_transaction_history_of_user", null);
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "list_transactions", null);
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "transaction_details", null);
exports.default = MAPPGQL;

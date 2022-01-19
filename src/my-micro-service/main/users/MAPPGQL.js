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
        this.userQueries = new query_1.default();
        this.userMutations = new mutation_1.default();
        this.params = params;
    }
    async health() {
        return { status: "ok" };
    }
    async user_login(args, req) {
        return await this.userQueries.user_login(args, req);
    }
    async view_creditline(args, req, user) {
        return await this.userQueries.view_creditline(args, req, user);
    }
    async send_amount(args, req, user) {
        return await this.userMutations.send_amount(args, req, user);
    }
    async view_transaction_history(args, req, user) {
        return await this.userQueries.view_transaction_history(args, req, user);
    }
}
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "view_creditline", null);
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "send_amount", null);
__decorate([
    Decorators_1.verifyUser()
], MAPPGQL.prototype, "view_transaction_history", null);
exports.default = MAPPGQL;

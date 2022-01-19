"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const db_schemas_1 = require("../../../db-schemas");
const db = new db_schemas_1.default();
const list_transactions = async (args, req, user) => {
    try {
        let obj = await db.transactions
            .find()
            .populate("from_user", ["_id", "username", "email"])
            .populate("to_user", ["_id", "username", "email"])
            .lean().exec();
        return { data: obj };
    }
    catch (err) {
        throw new graphql_1.GraphQLError(err.message, null, null, null);
    }
};
exports.default = list_transactions;

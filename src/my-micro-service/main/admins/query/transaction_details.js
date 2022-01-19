"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const db_schemas_1 = require("../../../db-schemas");
const db = new db_schemas_1.default();
const transaction_details = async (args, req, user) => {
    try {
        let obj = await db.transactions
            .find({ transaction_id: args.transaction_id })
            .populate("from_user", ["_id", "username", "email", "mobile"])
            .populate("to_user", ["_id", "username", "email", "mobile"])
            .lean().exec();
        return { data: obj };
    }
    catch (err) {
        throw new graphql_1.GraphQLError(err.message, null, null, null);
    }
};
exports.default = transaction_details;

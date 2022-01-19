"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_Handler_1 = require("../../../helpers/Error_Handler");
const db_schemas_1 = require("../../../db-schemas");
const db = new db_schemas_1.default();
const { GraphQLError } = require("graphql");
const view_transaction_history_of_user = async (args, req, user) => {
    try {
        let usr = await db.users.findOne({ _id: args._id });
        Error_Handler_1.default(!usr, "no user found");
        let transHistory = await db.transactions
            .find({ from_user: args._id })
            .populate("from_user", ["_id", "username", "email"])
            .populate("to_user", ["_id", "username", "email"])
            .lean()
            .exec();
        Error_Handler_1.default(!transHistory, "no transactions");
        return { data: transHistory };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = view_transaction_history_of_user;

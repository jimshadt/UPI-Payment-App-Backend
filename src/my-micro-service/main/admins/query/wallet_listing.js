"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_Handler_1 = require("../../../helpers/Error_Handler");
const db_schemas_1 = require("../../../db-schemas");
const db = new db_schemas_1.default();
const { GraphQLError } = require("graphql");
const wallet_listing = async (args, req, user) => {
    try {
        let obj = await db.wallets.find({ created_by: user.id }).lean().exec();
        Error_Handler_1.default(obj === null, "no wallets found");
        return { data: obj };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = wallet_listing;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const db_schemas_1 = require("../../../db-schemas");
const db = new db_schemas_1.default();
const list_users = async (args, req, user) => {
    try {
        let obj = await db.users.find({ created_by: user.id }).lean().exec();
        return { data: obj };
    }
    catch (err) {
        throw new graphql_1.GraphQLError(err.message, null, null, null);
    }
};
exports.default = list_users;

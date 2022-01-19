"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_Handler_1 = require("../../../helpers/Error_Handler");
const graphql_1 = require("graphql");
const db_schemas_1 = require("../../../db-schemas");
const db = new db_schemas_1.default();
const update_user = async (args, req, user) => {
    try {
        let user = await db.users.findOne({ email: args.email }).lean().exec();
        Error_Handler_1.default(user, "email already exist");
        await db.users.updateOne({ _id: args._id }, { $set: Object.assign({}, args) }).exec();
        return { message: "user updated successfully" };
    }
    catch (err) {
        throw new graphql_1.GraphQLError(err.message, null, null, null);
    }
};
exports.default = update_user;

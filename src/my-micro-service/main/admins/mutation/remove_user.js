"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_Handler_1 = require("../../../helpers/Error_Handler");
const graphql_1 = require("graphql");
const db_schemas_1 = require("../../../db-schemas");
const db = new db_schemas_1.default();
const remove_user = async (args, req, user) => {
    try {
        let obj = await db.users.findOne({ email: args.email }).lean().exec();
        Error_Handler_1.default(!obj, "no user email found");
        await db.users.deleteOne({ _id: obj._id });
        return { message: "user deleted" };
    }
    catch (err) {
        throw new graphql_1.GraphQLError(err.message, null, null, null);
    }
};
exports.default = remove_user;

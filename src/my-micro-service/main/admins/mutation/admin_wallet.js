"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_schemas_1 = require("../../../db-schemas");
const db = new db_schemas_1.default();
const { GraphQLError } = require("graphql");
const admin_wallet = async (args, req, user) => {
    try {
        let obj = await db.admins.findOne({ _id: user.id }).lean().exec();
        args.created_by = obj._id;
        db.wallets.create(args);
        return { message: "admin wallet created" };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = admin_wallet;

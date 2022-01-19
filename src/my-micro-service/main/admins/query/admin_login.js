"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const Error_Handler_1 = require("../../../helpers/Error_Handler");
const db_schemas_1 = require("../../../db-schemas");
const jwt_authentication_1 = require("../../../helpers/jwt_authentication");
const db = new db_schemas_1.default();
const { GraphQLError } = require("graphql");
const admin_login = async (args, req) => {
    try {
        let obj = await db.admins.findOne({ email: args.email }).lean().exec();
        Error_Handler_1.default(obj === null, "email does not exists");
        let verifPass = await bcrypt.compare(args.password, obj.password);
        Error_Handler_1.default(verifPass !== true, "incorrect password");
        var token = jwt_authentication_1.default({
            id: obj._id,
            username: obj.username,
        });
        return { message: "logged in", token: token };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = admin_login;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const Error_Handler_1 = require("../../../helpers/Error_Handler");
const db_schemas_1 = require("../../../db-schemas");
const db = new db_schemas_1.default();
const { GraphQLError } = require("graphql");
const saltRounds = 10;
const user_signup = async (args, req) => {
    try {
        let obj1 = await db.users.findOne({ email: args.email }).lean().exec();
        Error_Handler_1.default(obj1, "email already registered");
        Error_Handler_1.default(args.password.length < 5, "password must have atleast 5 charecter");
        await bcrypt.hash(args.password, saltRounds, function (err, hash) {
            args.password = hash;
            db.users.create(args);
        });
        return { message: "user account created" };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = user_signup;

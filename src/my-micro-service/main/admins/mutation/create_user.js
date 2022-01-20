"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_Handler_1 = require("../../../helpers/Error_Handler");
const graphql_1 = require("graphql");
const db_schemas_1 = require("../../../db-schemas");
const email_sender_1 = require("../../../helpers/email_sender");
const config_1 = require("../../../config");
const db = new db_schemas_1.default();
const create_user = async (args, req, user) => {
    try {
        let obj1 = await db.users.findOne({ email: args.email }).lean().exec();
        Error_Handler_1.default(obj1, "email already registered");
        args.created_by = user.id;
        db.users.create(args);
        let message = {
            to: args.email,
            from: ` <${config_1.default.get("smtp:user")}>`,
            subject: "Login details of your Payment App",
            text: "your default password to login the payment app is: 12345 "
        };
        return email_sender_1.emailSender.send(message).then(() => {
            return { message: "New user created" };
        }, async (err) => {
            console.log("error sending email to user", err.message);
            return { message: "New user created" };
        });
    }
    catch (err) {
        throw new graphql_1.GraphQLError(err.message, null, null, null);
    }
};
exports.default = create_user;

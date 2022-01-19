"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const EmailValidator = require("email-validator");
const validatePhone = require("validate-phone-number-node-js");
const Error_Handler_1 = require("../../../helpers/Error_Handler");
const db_schemas_1 = require("../../../db-schemas");
const password_validator_1 = require("../../../helpers/password_validator");
const db = new db_schemas_1.default();
const { GraphQLError } = require("graphql");
const saltRounds = 10;
const admin_signup = async (args, req) => {
    try {
        let email = await db.admins.findOne({ email: args.email }).lean().exec();
        Error_Handler_1.default(email, "email already registered");
        let validEmail = await EmailValidator.validate(args.email);
        Error_Handler_1.default(!validEmail, "Email does not valid");
        let validPhone = await validatePhone.validate(args.phone_number);
        Error_Handler_1.default(!validPhone, 'phone number does not valid');
        await password_validator_1.passwordValidator(args.password);
        let hashed = await bcrypt.hash(args.password, saltRounds);
        args.password = hashed;
        db.admins.create(args);
        return { message: "account created" };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = admin_signup;

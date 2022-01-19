"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_Handler_1 = require("./Error_Handler");
async function passwordValidator(password) {
    Error_Handler_1.default(password.length < 8, "Password must be atleast 8 charecters");
    Error_Handler_1.default(password.search(/[a-z]/) < 0, "Password must contain atleast least one lower case");
    Error_Handler_1.default(password.search(/[A-Z]/) < 0, "Password must contain atleast least one upper case");
    Error_Handler_1.default(password.search(/[0-9]/) < 0, "Password must contain at least one digit");
    Error_Handler_1.default(password.search(/[!@#\$%\^\&*\)\(+=._-]/) < 0, "Password must contain at least one special character");
}
exports.passwordValidator = passwordValidator;

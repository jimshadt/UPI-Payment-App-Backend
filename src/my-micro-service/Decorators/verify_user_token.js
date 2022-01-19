"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_Handler_1 = require("../helpers/Error_Handler");
const jwt = require("jsonwebtoken");
function extract_token_from_request(req) {
    var token = (req.locals && req.locals.token) || req.query.token || req.body.token || req.headers["x-access-token"];
    return token;
}
function verifyUser(accountType) {
    return function (target, propertyName, propertyDesciptor) {
        const method = propertyDesciptor.value;
        propertyDesciptor.value = async function (...args) {
            Error_Handler_1.default(args && args.length > 2, "Invalid number of arguments for the request handler");
            let req = args[1];
            var token = await extract_token_from_request(req);
            var verifyToken = await jwt.verify(token, "secret101");
            Error_Handler_1.default(verifyToken === null, "Unauthorized");
            var user = verifyToken;
            if (typeof accountType !== "undefined") {
                Error_Handler_1.default(user.accountType !== accountType, `This is not an ${accountType} account`);
            }
            args.push(user);
            const result = await method.apply(this, args);
            return result;
        };
        return propertyDesciptor;
    };
}
exports.verifyUser = verifyUser;

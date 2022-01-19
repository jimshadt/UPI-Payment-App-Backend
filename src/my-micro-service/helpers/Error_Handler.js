"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import assert = require("assert");
const { GraphQLError } = require("graphql");
const myAssert = (condition, message) => {
    if (condition) {
        throw new GraphQLError(message, null, null, null);
    }
};
exports.default = myAssert;

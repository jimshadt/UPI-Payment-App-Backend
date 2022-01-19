"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { GraphQLError } = require("graphql");
const view_creditline = async (args, req, user) => {
    try {
        return { creditline: user.available_creditline };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = view_creditline;

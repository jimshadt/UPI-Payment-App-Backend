"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rohittalwar on 15/01/16.
 */
const nconf = require("nconf");
var currentEnv = process.env.NODE_ENV || "development";
nconf.argv()
    .env()
    .file({ file: require.resolve('./' + currentEnv + '.json') });
exports.default = nconf;

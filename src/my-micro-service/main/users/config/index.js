"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nconf_1 = require("nconf");
let nconf = new nconf_1.Provider({});
var currentEnv = process.env.NODE_ENV || "development";
try {
    nconf.file({ file: require.resolve(`./${currentEnv}.json`) });
}
catch (e) {
    //ignore file errors  
}
exports.default = nconf;

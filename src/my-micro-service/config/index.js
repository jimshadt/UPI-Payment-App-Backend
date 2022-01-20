"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nconf_1 = require("nconf");
let nconf = new nconf_1.Provider({});
var currentEnv = process.env.NODE_ENV || "development";
nconf
    .argv()
    .env()
    .file({ file: require.resolve("./" + currentEnv + ".json") });
const env_map = {
    SMTP_USER: "smtp:user",
    SMTP_PASSWD: "smtp:password",
};
for (let key in env_map) {
    env_map[key] && nconf.set(env_map[key], nconf.get(key));
}
exports.default = nconf;

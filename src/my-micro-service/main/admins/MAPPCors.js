"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const cors = require("cors");
let domains = config_1.default.get('cors_domains');
var whitelist = domains.map((domain) => {
    let reg_str = domain.split('.').join('\.') + '$';
    let regex = new RegExp(reg_str);
    return regex;
});
let corsOptionsWhitelist = { origin: whitelist, optionsSuccessStatus: 200 };
exports.default = cors(corsOptionsWhitelist);

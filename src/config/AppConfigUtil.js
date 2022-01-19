"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_vault_config_1 = require("node-vault-config");
const appConfig_1 = require("./appConfig");
class AppConfigUtil {
    static get(path) {
        return appConfig_1.default.get(path);
    }
    static set(path, value) {
        return appConfig_1.default.set(path, value);
    }
    static vault() {
        return node_vault_config_1.VaultFactory.create(AppConfigUtil.get("vault:base"), AppConfigUtil.get("vault_token"));
    }
    static appName() {
        return AppConfigUtil.get('app_name');
    }
}
exports.default = AppConfigUtil;

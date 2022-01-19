"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const AppConfigUtil_1 = require("../config/AppConfigUtil");
class DBConnection {
    static async dbHost() {
        let mongoUrl;
        try {
            mongoUrl = await AppConfigUtil_1.default.vault().get(`${AppConfigUtil_1.default.appName()}/mongo/base_url`);
            return mongoUrl;
        }
        catch (e) {
            mongoUrl = AppConfigUtil_1.default.get("db:base_url");
        }
        return mongoUrl;
    }
    static async connect(dbName, dbHost) {
        dbHost = dbHost || (await DBConnection.dbHost());
        console.log('connecting to ', dbHost);
        let db;
        try {
            db = await DBConnection.connectToPath(`${dbHost}/${dbName}`);
        }
        catch (e) {
            console.log("e", e);
            try {
                db = DBConnection.connectToPath(`mongodb://localhost:27017/${dbName}`);
            }
            catch (e) {
                throw e;
            }
        }
        return db;
    }
    static async connectToPath(url) {
        let options = AppConfigUtil_1.default.get("db:auth") ? (await DBConnection.connectionOptions()) : {};
        return new Promise((resolve, reject) => {
            mongoose.connect(url, Object.assign(Object.assign({}, options), { useNewUrlParser: true, useUnifiedTopology: true })).then(resolve, reject);
        });
    }
    static async connectionOptions() {
        let isDbAuth = AppConfigUtil_1.default.get("db:auth");
        let mongoPass = isDbAuth ? (await AppConfigUtil_1.default.vault().get(`${AppConfigUtil_1.default.appName()}/mongo/pass`)) : AppConfigUtil_1.default.get("MONGO_USER");
        let mongoUser = isDbAuth ? (await AppConfigUtil_1.default.vault().get(`${AppConfigUtil_1.default.appName()}/mongo/user`)) : AppConfigUtil_1.default.get("MONGO_PASS");
        let options = isDbAuth ? AppConfigUtil_1.default.get("db:mongoose") : {};
        options.reconnectTries = Number.MAX_VALUE;
        options.reconnectInterval = 500;
        options.poolSize = 10;
        let user = mongoUser;
        let pass = mongoPass;
        options.auth = {};
        options.auth.user = user ? user : options.user;
        options.auth.password = pass ? pass : options.pass;
        return options;
    }
}
exports.default = DBConnection;

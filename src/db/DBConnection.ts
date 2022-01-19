

import * as mongoose from 'mongoose';
import AppConfigUtil from '../config/AppConfigUtil';


export default class DBConnection {


    
    static async dbHost(): Promise<string> {
        let mongoUrl;
        try {
            mongoUrl = await AppConfigUtil.vault().get(`${AppConfigUtil.appName()}/mongo/base_url`);
            return mongoUrl;
        } catch (e) {
            mongoUrl = AppConfigUtil.get("db:base_url");
        }
        return mongoUrl;
    }
    static async connect(dbName: string, dbHost?: string): Promise<any> {

        dbHost = dbHost || (await DBConnection.dbHost());
        console.log('connecting to ', dbHost);
        let db;
        try {
            db = await DBConnection.connectToPath(`${dbHost}/${dbName}`);
        } catch (e) {
            console.log("e", e);
            try {
                db = DBConnection.connectToPath(`mongodb://localhost:27017/${dbName}`)
            } catch (e) {
                throw e;
            }
        }
        return db;



    }

    private static async connectToPath(url: string): Promise<any> {

        let options: mongoose.ConnectionOptions = AppConfigUtil.get("db:auth") ? (await DBConnection.connectionOptions()) : {};

        return new Promise((resolve, reject) => {
            mongoose.connect(url, { ...options, useNewUrlParser: true,useUnifiedTopology: true }).then(resolve, reject);
        })
    }

    static async connectionOptions(): Promise<any> {

        let isDbAuth = AppConfigUtil.get("db:auth");
        let mongoPass = isDbAuth ? (await AppConfigUtil.vault().get(`${AppConfigUtil.appName()}/mongo/pass`)) : AppConfigUtil.get("MONGO_USER");
        let mongoUser = isDbAuth ? (await AppConfigUtil.vault().get(`${AppConfigUtil.appName()}/mongo/user`)) : AppConfigUtil.get("MONGO_PASS");
        let options = isDbAuth ? AppConfigUtil.get("db:mongoose") : {}
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
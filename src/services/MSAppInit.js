"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const errorhandler = require("errorhandler");
const compression = require("compression");
const AppConfigUtil_1 = require("../config/AppConfigUtil");
class MSAppInit {
    static async initMicroService(app) {
        MSAppInit.initializeExpressApp(app);
        return;
    }
    static initializeExpressApp(app) {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(compression());
        app.use(bodyParser.json());
        AppConfigUtil_1.default.get("useErrorHandler") ? app.use(errorhandler({
            log: true
        })) : null;
    }
    static errorHandler(app) {
        app.use((err, req, res, next) => {
            res.send({ error: (err.message || err.toString()) });
            next();
        });
    }
}
exports.default = MSAppInit;

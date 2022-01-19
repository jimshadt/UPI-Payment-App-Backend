import * as bodyParser from 'body-parser';
import * as errorhandler from 'errorhandler';
import * as compression from 'compression';
import * as express from 'express';


import AppConfigUtil from '../config/AppConfigUtil';

export default class MSAppInit {

    static async initMicroService(app: express.Application) {
        MSAppInit.initializeExpressApp(app)

        return;

    }
    static initializeExpressApp(app: express.Application) {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(compression() as any);
        app.use(bodyParser.json());



        AppConfigUtil.get("useErrorHandler") ? app.use(errorhandler({
            log: true
        })) : null;
    }
    static errorHandler(app: express.Application) {
        app.use((err, req, res, next) => {
            res.send({ error: (err.message || err.toString()) })
            next();
        })
    }


}
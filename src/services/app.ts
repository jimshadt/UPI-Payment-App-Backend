import DBConnection from "../db/DBConnection";
import AppConfigUtil from "../config/AppConfigUtil";
import * as express from "express"
import MSAppInit from "./MSAppInit";
import * as http from "http"

import { MAPP as ADMINSERVICE } from "my-micro-service/main/admins";
import { MAPP as USERSERVICE } from "my-micro-service/main/users";



DBConnection.connect(AppConfigUtil.get(`db:name`)).finally(async () => {
    let app = express();
    let h = new http.Server(app);
    app.set('trust proxy', true);

    await MSAppInit.initMicroService(app);



    app.use('/graphql/my-micro-service/admins',ADMINSERVICE);
    app.use('/graphql/my-micro-service/users',USERSERVICE);


    let port = AppConfigUtil.get("microapps:port")
    let server = h.listen(port, () => {
        console.log('server started at port', port)
        if (process.send) {
            process.send('online');
        }
    })
    MSAppInit.errorHandler(app);

}).catch((err) => {
    console.log('Microservice:mongo connection failed', err)
})



import MAPPGQLRoot from "./MAPPGQLRoot";
import MAPPCors from "./MAPPCors";
import * as express from "express"

var MAPP = express.Router();

MAPP.options('*', MAPPCors);
MAPP.use(MAPPCors);
MAPP.use(MAPPGQLRoot);

export default MAPP;
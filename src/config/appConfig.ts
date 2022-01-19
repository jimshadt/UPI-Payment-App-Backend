/**
 * Created by rohittalwar on 15/01/16.
 */
import * as nconf from "nconf";

var currentEnv = process.env.NODE_ENV || "development";
nconf.argv()
    .env()
    .file({ file: require.resolve('./' + currentEnv + '.json') });
export default nconf

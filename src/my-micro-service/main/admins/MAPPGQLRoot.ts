

import * as GraphHTTP from 'express-graphql';
import * as graphql from 'graphql';
import MAPPGQL from './MAPPGQL';

import { schemaConfigBuilder, schema_builder } from './SchemaBuilder';

const config_path = './api-schemas/config.json';
const schemaConfig = schemaConfigBuilder(require.resolve(config_path));
let GQLRoot = {};
let allFields = { ...schemaConfig.query.getFields(), ...schemaConfig.mutation.getFields() }
for (let key in allFields) {
    GQLRoot[key] = async (args: any, req: any) => {
        let obj = new MAPPGQL({})
        return obj[key](args, req);
    }
}


export default GraphHTTP({
    schema: schema_builder(require.resolve(config_path)),
    rootValue: GQLRoot,
    pretty: true,
    graphiql: true
})


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GraphHTTP = require("express-graphql");
const MAPPGQL_1 = require("./MAPPGQL");
const SchemaBuilder_1 = require("./SchemaBuilder");
const config_path = './api-schemas/config.json';
const schemaConfig = SchemaBuilder_1.schemaConfigBuilder(require.resolve(config_path));
let GQLRoot = {};
let allFields = Object.assign(Object.assign({}, schemaConfig.query.getFields()), schemaConfig.mutation.getFields());
for (let key in allFields) {
    GQLRoot[key] = async (args, req) => {
        let obj = new MAPPGQL_1.default({});
        return obj[key](args, req);
    };
}
exports.default = GraphHTTP({
    schema: SchemaBuilder_1.schema_builder(require.resolve(config_path)),
    rootValue: GQLRoot,
    pretty: true,
    graphiql: true
});

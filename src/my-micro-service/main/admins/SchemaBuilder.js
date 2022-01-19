"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const graphql = require("graphql");
const graphql_1 = require("graphql");
exports.getGQLType = (configPath, name, field, isInput = false) => {
    let type = field.type;
    let isRequired = field.required;
    let gql_field = (() => {
        switch (type) {
            case 'float':
                return graphql.GraphQLFloat;
            case 'string':
                return graphql.GraphQLString;
            case 'integer':
                return graphql.GraphQLInt;
            case 'boolean':
                return graphql.GraphQLBoolean;
            case 'object':
                let o = {
                    name,
                    fields: exports.getGqlFields(name, configPath, field, isInput),
                    description: field.description
                };
                return isInput ? new graphql_1.GraphQLInputObjectType(o) : new graphql_1.GraphQLObjectType(o);
            case 'array':
                return new graphql.GraphQLList(exports.getGQLType(configPath, name, field.items, isInput));
            default:
                console.error({ type, configPath, name, field });
                throw new Error('graphql-json-schema: Unsupported type ' + type);
        }
    })();
    return isRequired ? new graphql_1.GraphQLNonNull(gql_field) : gql_field;
};
// export const buildType = (configPath: string, name: string, schema: any): GraphQLObjectType => {
//     let fields = getGqlFields(configPath, schema);
//     return new GraphQLObjectType({
//         name,
//         fields,
//         description: schema.description
//     });
// }
exports.getGqlFields = (parentname, configPath, schema, isInput = false) => {
    let fields = {};
    let properties = schema.properties;
    let isImported = typeof properties === 'string' && properties.startsWith('require:');
    let fieldConfigPath = isImported ? path.join(path.dirname(configPath), properties.replace(/require:/, '').trim()) : configPath;
    let properties_data = isImported ? JSON.parse(fs.readFileSync(fieldConfigPath).toString('utf8')) : properties;
    let importedFields = {};
    for (let key in properties_data) {
        let isKeyImported = typeof key === 'string' && key.startsWith('require:');
        if (isKeyImported) {
            // let keyConfigPath = path.join(path.dirname(configPath), properties_data[key].replace(/require:/, '').trim())
            let propertyData = JSON.parse(fs.readFileSync(fieldConfigPath).toString('utf8'));
            importedFields = Object.assign(Object.assign({}, importedFields), propertyData);
        }
        else {
            fields[key] = {
                type: exports.getGQLType(fieldConfigPath, `${parentname}_${key}`, properties_data[key], isInput),
                description: typeof properties_data[key].description === 'string' ? properties_data[key].description : JSON.stringify(properties_data[key].description)
            };
        }
    }
    properties_data = importedFields;
    for (let key in properties_data) {
        fields[key] = {
            type: exports.getGQLType(fieldConfigPath, `${parentname}_${key}`, properties_data[key], isInput),
            description: typeof properties_data[key].description === 'string' ? properties_data[key].description : JSON.stringify(properties_data[key].description)
        };
    }
    return fields;
};
exports.schema_builder = (config_path) => {
    return new graphql.GraphQLSchema(exports.schemaConfigBuilder(config_path));
};
exports.schemaConfigBuilder = (p) => {
    let config = JSON.parse(fs.readFileSync(p).toString('utf8'));
    let dependencies = config.dependencies;
    let configPathDir = path.dirname(p);
    let queryFields = {};
    let mutationFields = {};
    for (let d of dependencies) {
        let destinationBucket = (d.type === 'Query') ? queryFields : mutationFields;
        let configPath = path.join(configPathDir, d.path);
        d.schema = JSON.parse(fs.readFileSync(configPath).toString('utf8'));
        destinationBucket[d.name] = {
            type: exports.getGQLType(configPath, `response_${d.name}`, d.schema.response, false),
            args: exports.getGqlFields(d.name, configPath, d.schema.request, true),
            description: typeof d.schema.request.description === 'string' ? d.schema.request.description : JSON.stringify(d.schema.request.description)
        };
    }
    console.log({ queryFields });
    const schemaConfig = {
        query: new graphql_1.GraphQLObjectType({
            name: 'Query',
            fields: Object.assign({}, queryFields)
        }),
        mutation: new graphql_1.GraphQLObjectType({
            name: 'Mutation',
            fields: Object.assign({}, mutationFields)
        })
    };
    return schemaConfig;
};

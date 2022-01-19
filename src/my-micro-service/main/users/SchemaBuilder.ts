import * as fs from "fs"
import * as path from "path"
import * as graphql from 'graphql';
import { GraphQLObjectType, GraphQLInputObjectType, GraphQLNonNull } from 'graphql'
export const getGQLType = (configPath: string, name: string, field: any, isInput: boolean = false): any => {
    let type = field.type;

    let isRequired = field.required;
    let gql_field = (() => {
        switch (type) {
            case 'float':
                return graphql.GraphQLFloat
            case 'string':
                return graphql.GraphQLString
            case 'integer':
                return graphql.GraphQLInt
            case 'boolean':
                return graphql.GraphQLBoolean
            case 'object':
                let o = {
                    name,
                    fields: getGqlFields(name, configPath, field, isInput),
                    description: field.description
                };
                return isInput ? new GraphQLInputObjectType(o) : new GraphQLObjectType(o);
            case 'array':
                return new graphql.GraphQLList(getGQLType(configPath, name, field.items, isInput))

            default:
                console.error({ type, configPath, name, field });
                throw new Error('graphql-json-schema: Unsupported type ' + type);
        }
    })();

    return isRequired ? new GraphQLNonNull(gql_field) : gql_field;

}
// export const buildType = (configPath: string, name: string, schema: any): GraphQLObjectType => {
//     let fields = getGqlFields(configPath, schema);
//     return new GraphQLObjectType({
//         name,
//         fields,
//         description: schema.description
//     });
// }

export const getGqlFields = (parentname: string, configPath: string, schema: any, isInput = false): any => {

    let fields: { [key: string]: any } = {};
    let properties = schema.properties;

    let isImported = typeof properties === 'string' && (properties as string).startsWith('require:');
    let fieldConfigPath = isImported ? path.join(path.dirname(configPath), properties.replace(/require:/, '').trim()) : configPath;
    let properties_data: { [key: string]: any } = isImported ? JSON.parse(fs.readFileSync(fieldConfigPath).toString('utf8')) : properties;
    let importedFields = {};
    for (let key in properties_data) {
        let isKeyImported = typeof key === 'string' && (key as string).startsWith('require:');
        if (isKeyImported) {
            // let keyConfigPath = path.join(path.dirname(configPath), properties_data[key].replace(/require:/, '').trim())
            let propertyData = JSON.parse(fs.readFileSync(fieldConfigPath).toString('utf8'));
            importedFields = { ...importedFields, ...propertyData };
        } else {
            fields[key] = {
                type: getGQLType(fieldConfigPath, `${parentname}_${key}`, properties_data[key], isInput),
                description: typeof properties_data[key].description === 'string' ? properties_data[key].description : JSON.stringify(properties_data[key].description)
            }
        }
    }
    properties_data = importedFields;
    for (let key in properties_data) {
        fields[key] = {
            type: getGQLType(fieldConfigPath, `${parentname}_${key}`, properties_data[key], isInput),
            description: typeof properties_data[key].description === 'string' ? properties_data[key].description : JSON.stringify(properties_data[key].description)
        }
    }

    return fields
}
export const schema_builder = (config_path: string): graphql.GraphQLSchema => {
    return new graphql.GraphQLSchema(schemaConfigBuilder(config_path));
}

export const schemaConfigBuilder = (p: string): any => {
    let config = JSON.parse(fs.readFileSync(p).toString('utf8'));
    let dependencies = config.dependencies;
    let configPathDir = path.dirname(p);
    let queryFields = {};
    let mutationFields = {};
    for (let d of dependencies) {
        let destinationBucket: any = (d.type === 'Query') ? queryFields : mutationFields
        let configPath = path.join(configPathDir, d.path);
        d.schema = JSON.parse(fs.readFileSync(configPath).toString('utf8'));

        destinationBucket[d.name] = {
            type: getGQLType(configPath, `response_${d.name}`, d.schema.response, false),
            args: getGqlFields(d.name, configPath, d.schema.request, true),
            description: typeof d.schema.request.description === 'string' ? d.schema.request.description : JSON.stringify(d.schema.request.description)
        }
    }
    console.log({ queryFields });
    const schemaConfig = {
        query: new GraphQLObjectType({
            name: 'Query',
            fields: {
                ...queryFields
            }
        }),
        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                ...mutationFields
            }
        })
    };
    return schemaConfig;
}
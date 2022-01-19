//import assert = require("assert");
const { GraphQLError } = require("graphql")

 const myAssert = (condition, message: string) => {
    if ( condition ){
        throw new GraphQLError (message,null,null,null);
    }
}

export default myAssert;
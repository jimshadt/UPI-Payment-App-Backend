const { GraphQLError } = require("graphql");


const view_creditline = async (args:any,req:any,user:any) => {
    try{
        
        return{ creditline:user.available_creditline }
    }
    catch (err){
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default view_creditline;
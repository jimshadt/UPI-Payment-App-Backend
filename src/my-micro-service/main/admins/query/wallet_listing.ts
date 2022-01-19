import myAssert from "../../../helpers/Error_Handler";
import DBInterface from "../../../db-schemas";
const db = new DBInterface();
const { GraphQLError } = require("graphql");


const wallet_listing = async (args:any,req:any,user:any) => {
    try{
        let obj:any = await db.wallets.find({ created_by: user.id }).lean().exec();
        myAssert(obj===null,"no wallets found")
        
            return {  data:obj };

    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default wallet_listing;
import myAssert from "../../../helpers/Error_Handler";
import DBInterface from "../../../db-schemas";
const db = new DBInterface();
const { GraphQLError } = require("graphql");



const admin_wallet = async (args:any,req:any,user:any) => {
    try{            
        let obj = await db.admins.findOne({ _id: user.id }).lean().exec();
            args.created_by = obj._id
            db.wallets.create( args )
            return { message: "admin wallet created" };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }    
}

export default admin_wallet;
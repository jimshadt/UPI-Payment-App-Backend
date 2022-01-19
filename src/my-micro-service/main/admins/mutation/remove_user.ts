import myAssert from "../../../helpers/Error_Handler";
import { GraphQLError } from "graphql";
import DBInterface from "../../../db-schemas";
const db = new DBInterface();


const remove_user = async (args:any, req:any,user:any) => {
    try{

        let obj:any = await db.users.findOne({ email: args.email }).lean().exec();

        myAssert(!obj,"no user email found");
          
        await db.users.deleteOne({_id:obj._id})
            return { message: "user deleted" };
            
    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }

}

export default remove_user;
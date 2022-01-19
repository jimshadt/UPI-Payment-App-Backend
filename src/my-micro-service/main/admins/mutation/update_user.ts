import myAssert from "../../../helpers/Error_Handler";
import { GraphQLError } from "graphql";
import DBInterface from "../../../db-schemas";
const db = new DBInterface();


const update_user = async (args:any, req:any,user:any) => {
    try{

        let user:any = await db.users.findOne({ email: args.email }).lean().exec();
        myAssert(user,"email already exist")
          
        await db.users.updateOne({_id:args._id},{$set: { ...args }} ).exec();
        
            return { message: "user updated successfully" };
            
    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }

}

export default update_user;
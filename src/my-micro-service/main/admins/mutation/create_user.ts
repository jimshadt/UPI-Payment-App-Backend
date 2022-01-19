import myAssert from "../../../helpers/Error_Handler";
import { GraphQLError } from "graphql";
import DBInterface from "../../../db-schemas";
import sendMail from "../../../helpers/email_sender";
const db = new DBInterface();


const create_user = async (args:any, req:any,user:any) => {
    try{

        let obj1:any = await db.users.findOne({ email: args.email }).lean().exec();

        myAssert(obj1,"email already registered")
          
        args.created_by = user.id
        db.users.create(args)
            
        let message = {
            subject:"Login details of your Payment App",
            text: "your default password to login the payment app is: 12345 "
        }
            await sendMail(message);
            return { message: "new user created" };
            
    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }

}

export default create_user;
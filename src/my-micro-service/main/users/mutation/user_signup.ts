import * as bcrypt from "bcrypt";
import myAssert from "../../../helpers/Error_Handler";
import DBInterface from "../../../db-schemas";
const db = new DBInterface();
const { GraphQLError } = require("graphql");
const saltRounds = 10;



const user_signup = async (args: any, req: any) => {
    try {
        let obj1:any = await db.users.findOne({ email: args.email }).lean().exec();

        myAssert(obj1,"email already registered")
        myAssert(args.password.length < 5,"password must have atleast 5 charecter")
        
            await bcrypt.hash(args.password,saltRounds,function(err,hash){
                args.password = hash                        
                db.users.create(args)
            })
            return { message: "user account created" };
            
    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default user_signup;
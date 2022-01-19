import * as bcrypt from "bcrypt";
import myAssert from "../../../helpers/Error_Handler";
import DBInterface from "../../../db-schemas";
import token_creation from "../../../helpers/jwt_authentication";
const db = new DBInterface();
const { GraphQLError } = require("graphql");


const user_login = async (args: any, req: any) => {
    try {
        let obj:any = await db.users.findOne({ email: args.email }).lean().exec()
        myAssert(obj===null,"email does not exists")
        
        //let verifPass = await bcrypt.compare(args.password,obj.password)
        myAssert(args.password!==obj.password,"incorrect password")
            
            var token:any = token_creation({
                id: obj._id,
                username: obj.username,
                //accountType: Config.get("account_types:admin"),
            })
            
            return { message: "logged in", token: token };
            
    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default user_login;
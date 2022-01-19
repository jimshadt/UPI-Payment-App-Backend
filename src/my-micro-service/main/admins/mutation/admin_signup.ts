import * as bcrypt from "bcrypt";
import * as EmailValidator from 'email-validator';
import * as validatePhone from 'validate-phone-number-node-js'
import myAssert from "../../../helpers/Error_Handler";
import DBInterface from "../../../db-schemas";
import { passwordValidator } from "../../../helpers/password_validator";
const db = new DBInterface();
const { GraphQLError } = require("graphql");
const saltRounds = 10;


const admin_signup = async (args: any, req: any) => {
    try {
        let email = await db.admins.findOne({ email: args.email }).lean().exec();
        myAssert (email,"email already registered")

        let validEmail = await EmailValidator.validate(args.email)
        myAssert(!validEmail,"Email does not valid")

        let validPhone = await validatePhone.validate(args.phone_number)
        myAssert(!validPhone,'phone number does not valid')

        await passwordValidator(args.password)
        let hashed = await bcrypt.hash(args.password,saltRounds)
            args.password = hashed
            db.admins.create(args)

        return { message: "account created" }; 
    } 
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default admin_signup;
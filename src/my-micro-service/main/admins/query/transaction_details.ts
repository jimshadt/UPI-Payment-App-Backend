import { GraphQLError } from "graphql";
import DBInterface from "../../../db-schemas";
const db = new DBInterface();


const transaction_details = async (args: any, req: any, user: any) => {
  try {
    let obj: any = await db.transactions
    .find({transaction_id:args.transaction_id})
    .populate("from_user",["_id","username","email","mobile"])
    .populate("to_user",["_id","username","email","mobile"])
    .lean().exec();
    return { data: obj };
  } catch (err) {
    throw new GraphQLError(err.message, null, null, null);
  }
};

export default transaction_details;

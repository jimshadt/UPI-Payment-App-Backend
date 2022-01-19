import { GraphQLError } from "graphql";
import DBInterface from "../../../db-schemas";
const db = new DBInterface();


const list_transactions = async (args: any, req: any, user: any) => {
  try {
    let obj: any = await db.transactions
    .find()
    .populate("from_user",["_id","username","email"])
    .populate("to_user",["_id","username","email"])
    .lean().exec();
    return { data: obj };
  } catch (err) {
    throw new GraphQLError(err.message, null, null, null);
  }
};

export default list_transactions;

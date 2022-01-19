import { GraphQLError } from "graphql";
import DBInterface from "../../../db-schemas";
const db = new DBInterface();


const list_users = async (args: any, req: any, user: any) => {
  try {
    let obj: any = await db.users.find({ created_by: user.id }).lean().exec();

    return { data: obj };
  } catch (err) {
    throw new GraphQLError(err.message, null, null, null);
  }
};

export default list_users;

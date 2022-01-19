import myAssert from "../../../helpers/Error_Handler";
import DBInterface from "../../../db-schemas";
const db = new DBInterface();
const { GraphQLError } = require("graphql");

const view_transaction_history = async (args: any, req: any, user: any) => {
  try {
    let transHistory: any = await db.transactions
      .find({ from_user: user.id })
      .populate("to_user",["_id","username","email"])
      .lean()
      .exec();
      myAssert(transHistory===null,"no transactions found")
      
    return { data: transHistory };
  } catch (err) {
    throw new GraphQLError(err.message, null, null, null);
  }
};

export default view_transaction_history;

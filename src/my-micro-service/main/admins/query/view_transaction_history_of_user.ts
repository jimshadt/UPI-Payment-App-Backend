import myAssert from "../../../helpers/Error_Handler";
import DBInterface from "../../../db-schemas";
const db = new DBInterface();
const { GraphQLError } = require("graphql");

const view_transaction_history_of_user = async (args: any, req: any, user: any) => {
  try {
        let usr = await db.users.findOne({_id:args._id});
        myAssert(!usr,"no user found");

        let transHistory: any = await db.transactions
            .find({ from_user: args._id })
            .populate("from_user",["_id","username","email"])
            .populate("to_user",["_id","username","email"])
            .lean()
            .exec();
        myAssert(!transHistory,"no transactions");
      
    return { data: transHistory };
  } catch (err) {
    throw new GraphQLError(err.message, null, null, null);
  }
};

export default view_transaction_history_of_user;

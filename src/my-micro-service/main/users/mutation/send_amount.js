"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_Handler_1 = require("../../../helpers/Error_Handler");
const db_schemas_1 = require("../../../db-schemas");
var trn_id = "TR";
const db = new db_schemas_1.default();
const graphql_1 = require("graphql");
const send_amount = async (args, req, user) => {
    try {
        let fromUser = await db.users.findOne({ _id: user.id }).lean().exec();
        let toUser = await db.users.findOne({ email: args.recipient_email }).lean().exec();
        Error_Handler_1.default(!toUser, "no user found");
        Error_Handler_1.default(fromUser.email === toUser.email, "you are trying to send credits yourself");
        Error_Handler_1.default(args.amount > fromUser.available_creditline, "Insufficient credits");
        let lessCredit = parseFloat((fromUser.available_creditline - args.amount).toFixed(2));
        let addCredit = parseFloat((toUser.available_creditline + args.amount).toFixed(2));
        await db.users.updateOne({ _id: fromUser._id }, { available_creditline: lessCredit }).exec();
        await db.users.updateOne({ _id: toUser._id }, { available_creditline: addCredit }).exec();
        let lastTrans = await db.transactions.find().sort({ createdAt: -1 }).limit(1);
        if (!lastTrans.length) {
            trn_id = trn_id + 1000;
        }
        else {
            let count = lastTrans[0].transaction_id.replace("TR", "");
            let addCount = parseInt(count) + 1;
            trn_id = "TR" + addCount;
        }
        await db.transactions.create({
            from_user: fromUser._id,
            to_user: toUser._id,
            transaction_amount: parseFloat(args.amount).toFixed(2),
            before_balance: fromUser.available_creditline,
            after_balance: lessCredit,
            transaction_id: trn_id
        });
        await db.transactions.create({
            from_user: toUser._id,
            to_user: fromUser._id,
            transaction_amount: parseFloat(args.amount).toFixed(2),
            before_balance: toUser.available_creditline,
            after_balance: addCredit,
            transaction_id: trn_id
        });
        return { message: "transactions success" };
    }
    catch (err) {
        throw new graphql_1.GraphQLError(err.message, null, null, null);
    }
};
exports.default = send_amount;

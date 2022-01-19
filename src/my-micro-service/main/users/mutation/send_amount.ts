import myAssert from "../../../helpers/Error_Handler";
import DBInterface from "../../../db-schemas";
var trn_id = "TR"
const db = new DBInterface();
import { GraphQLError } from "graphql";


const send_amount = async (args:any, req:any, user:any) => {
    try{    
        let fromUser:any = await db.users.findOne({ _id:user.id }).lean().exec();
        let toUser:any = await db.users.findOne({ email:args.recipient_email }).lean().exec();
        
        myAssert(!toUser,"no user found");
        myAssert(fromUser.email===toUser.email,"you are trying to send credits yourself");
        myAssert(args.amount>fromUser.available_creditline,"Insufficient credits");
        
        let lessCredit:number = parseFloat((fromUser.available_creditline - args.amount).toFixed(2));
        let addCredit:number = parseFloat((toUser.available_creditline + args.amount).toFixed(2));

        await db.users.updateOne({ _id:fromUser._id }, { available_creditline:lessCredit }).exec();
        await db.users.updateOne({ _id:toUser._id }, { available_creditline:addCredit }).exec();
        
        let lastTrans:any = await db.transactions.find().sort({createdAt:-1}).limit(1);
        if(!lastTrans.length){
            trn_id = trn_id+1000;
        }else{
            let count = lastTrans[0].transaction_id.replace("TR","")
            let addCount = parseInt(count)+1;
            trn_id = "TR"+addCount;
        }

        await db.transactions.create({ 
            from_user:fromUser._id,
            to_user:toUser._id,
            transaction_amount:parseFloat(args.amount).toFixed(2),
            before_balance:fromUser.available_creditline,
            after_balance:lessCredit,
            transaction_id:trn_id,
            isListed:true
        })
        await db.transactions.create({ 
            from_user:toUser._id,
            to_user:fromUser._id,
            transaction_amount:parseFloat(args.amount).toFixed(2),
            before_balance:toUser.available_creditline,
            after_balance:addCredit,
            transaction_id:trn_id
        })
        
        return { message:"transactions success" }
    }catch(err){
        throw new GraphQLError(err.message, null, null, null);
    }

}
export default send_amount;
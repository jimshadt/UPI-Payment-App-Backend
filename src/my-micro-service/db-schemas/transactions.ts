import * as mongoose from 'mongoose';

export interface Itransactions {
    from_user : string
    to_user : string
    transaction_amount : number
    before_balance : number
    after_balance : number
    transaction_id: string
    upi_id : string
    isListed: boolean
};


let Schema = mongoose.Schema;
let mySchema = new Schema({
    from_user : { type: String , ref:"users" },
    to_user : { type: String, ref:"users" },
    transaction_amount : { type: Number },
    before_balance : { type: Number },
    after_balance : { type:Number },
    transaction_id : { type:String },
    upi_id : { type:String },
    is_listed : { type:Boolean, default:false },
},
{
    timestamps: true,
}
);


export interface ItransactionsModel extends mongoose.Document { }

export default mongoose.model<ItransactionsModel>('transactions', mySchema);
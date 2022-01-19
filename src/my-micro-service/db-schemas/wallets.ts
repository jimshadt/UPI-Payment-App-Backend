import * as mongoose from 'mongoose';

export interface Iwallets {
    walletName : string
    amount : number
    created_by:string

};


let Schema = mongoose.Schema;
let mySchema = new Schema({
    walletName : { type: String, required: true },
    amount : { type: Number, required: true },
    created_by : { type: String },
});


export interface IwalletsModel extends mongoose.Document { }

export default mongoose.model<IwalletsModel>('wallets', mySchema);
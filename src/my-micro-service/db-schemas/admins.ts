import * as mongoose from 'mongoose';

export interface Iadmins {
    name : string
    email : string
    phone_number : string
    password : string
};


let Schema = mongoose.Schema;
let mySchema = new Schema({
    name : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, required: true },
    phone_number : { type: String, required: true },
});


export interface IadminsModel extends mongoose.Document { }

export default mongoose.model<IadminsModel>('admins', mySchema);
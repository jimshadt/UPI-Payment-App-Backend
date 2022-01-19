import * as mongoose from 'mongoose';

export interface Iusers {
    username : string
    email : string
    password : string
    mobile : string
    created_by : string
    total_creditline : number
    available_creditline : number
    
};


let Schema = mongoose.Schema;
let mySchema = new Schema({
    username : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, default:12345 },
    mobile : { type: String},
    created_by : { type: String},
    total_creditline : { type: Number , default:1000 },
    available_creditline : { type: Number, default:1000 }
});


export interface IusersModel extends mongoose.Document { }

export default mongoose.model<IusersModel>('users', mySchema);
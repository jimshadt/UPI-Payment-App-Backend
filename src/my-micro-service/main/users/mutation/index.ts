import send_amount from "./send_amount";
import send_money_to_upi from "./send_money_to_upi";


export default class Mutations{
    async send_amount(args: any, req: any, user:any){
        return await send_amount(args,req,user)
    }

    async send_money_to_upi(args: any, req: any, user:any){
        return await send_money_to_upi(args,req,user)
    }

}
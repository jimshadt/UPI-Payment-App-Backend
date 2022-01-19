import send_amount from "./send_amount";


export default class Mutations{
    async send_amount(args: any, req: any, user:any){
        return await send_amount(args,req,user)
    }
   
}
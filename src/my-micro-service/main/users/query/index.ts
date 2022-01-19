import user_login from "./user_login";
import view_creditline from "./view_creditline";
import view_transaction_history from "./view_transaction_history";


export default class Queries {

    async user_login(args: any, req: any){
        return await user_login(args,req)
    }

    async view_creditline(args: any, req: any, user:any){
        return await view_creditline(args,req,user)
    }

    async view_transaction_history(args: any, req: any, user:any){
        return await view_transaction_history(args,req,user)
    }


}
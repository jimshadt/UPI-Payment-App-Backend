import admin_login from "./admin_login";
import list_users from "./list_users";
import wallet_listing from "./wallet_listing";
import view_transaction_history_of_user from "./view_transaction_history_of_user";
import list_transactions from "./list_transactions";
import transaction_details from "./transaction_details";

export default class Queries {
    async admin_login(args: any, req: any){
        return await admin_login(args,req)
    }

    async wallet_listing(args: any, req: any,user:any){
        return await wallet_listing(args,req,user)
    }

    async list_users(args: any, req: any,user:any){
        return await list_users(args,req,user)
    }

    async view_transaction_history_of_user(args: any, req: any,user:any){
        return await view_transaction_history_of_user(args,req,user)
    }

    async list_transactions(args: any, req: any,user:any){
        return await list_transactions(args,req,user)
    }

    async transaction_details(args: any, req: any,user:any){
        return await transaction_details(args,req,user)
    }

}
import Queries from "./query";
import Mutations from "./mutation";
import { verifyUser } from "../../Decorators";


export default class MAPPGQL {
    params: any;
    constructor(params: any) {
        this.params = params;
    }

    private adminQueries = new Queries();
    private adminMutations = new Mutations();

    async health() {
        return { status: "ok" };
    }

    
    async admin_signup(args: any, req: any){
        return await this.adminMutations.admin_signup(args,req)
    }

    async admin_login(args: any, req: any){
        return await this.adminQueries.admin_login(args,req)
    }

    @verifyUser()
    async create_user(args: any, req: any,user:any){
        return await this.adminMutations.create_user(args,req,user)
    }

    @verifyUser()
    async admin_wallet(args: any, req: any, user:any){
        return await this.adminMutations.admin_wallet(args,req,user)
    }

    @verifyUser()
    async wallet_listing(args: any, req: any,user:any){
        return await this.adminQueries.wallet_listing(args,req,user)
    }

    @verifyUser()
    async list_users(args: any, req: any,user:any){
        return await this.adminQueries.list_users(args,req,user)
    }

    @verifyUser()
    async update_user(args: any, req: any,user:any){
        return await this.adminMutations.update_user(args,req,user)
    }

    @verifyUser()
    async remove_user(args: any, req: any,user:any){
        return await this.adminMutations.remove_user(args,req,user)
    }

    @verifyUser()
    async view_transaction_history_of_user(args: any, req: any,user:any){
        return await this.adminQueries.view_transaction_history_of_user(args,req,user)
    }

    @verifyUser()
    async list_transactions(args: any, req: any,user:any){
        return await this.adminQueries.list_transactions(args,req,user)
    }

    @verifyUser()
    async transaction_details(args: any, req: any,user:any){
        return await this.adminQueries.transaction_details(args,req,user)
    }

}


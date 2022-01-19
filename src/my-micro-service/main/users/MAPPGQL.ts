import Queries from "./query";
import Mutations from "./mutation";
import { verifyUser } from "../../Decorators";



export default class MAPPGQL {
    params: any;
    constructor(params: any) {
        this.params = params;
    }

    private userQueries = new Queries();
    private userMutations = new Mutations();

    async health() {
        
        return { status: "ok" };
    }

    async user_login(args: any, req: any){
        return await this.userQueries.user_login(args,req)
    }

    @verifyUser()
    async view_creditline(args: any, req: any, user:any){
        return await this.userQueries.view_creditline(args,req,user)
    }

    @verifyUser()
    async send_amount(args: any, req: any, user:any){
        return await this.userMutations.send_amount(args,req,user)
    }

    @verifyUser()
    async view_transaction_history(args: any, req: any, user:any){
        return await this.userQueries.view_transaction_history(args,req,user)
    }
    
    
}


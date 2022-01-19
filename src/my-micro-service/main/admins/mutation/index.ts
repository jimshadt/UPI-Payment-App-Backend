import admin_signup from "./admin_signup";
import admin_wallet from "./admin_wallet";
import create_user from "./create_user";
import update_user from "./update_user";
import remove_user from "./remove_user";


export default class Mutations{
    async admin_signup(args: any, req: any){
        return await admin_signup(args,req)
    }

    async create_user(args: any, req: any,user:any){
        return await create_user(args,req,user)
    }

    async admin_wallet(args: any, req: any, user:any){
        return await admin_wallet(args,req,user)
    }

    async update_user(args: any, req: any, user:any){
        return await update_user(args,req,user)
    }

    async remove_user(args: any, req: any, user:any){
        return await remove_user(args,req,user)
    }
}
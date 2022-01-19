import VaultConfig from 'node-vault-config';
import { VaultFactory } from 'node-vault-config';
import appConfig from "./appConfig"
export default class AppConfigUtil {

    static get(path: string): any {
        return appConfig.get(path);
    }

    static set(path: string, value: any): any {
        return appConfig.set(path, value);
    }

    static vault(): VaultConfig {
        return VaultFactory.create(AppConfigUtil.get("vault:base"), AppConfigUtil.get("vault_token"));
    }

    
    static appName(): string {
        return AppConfigUtil.get('app_name');        
    }

   
}
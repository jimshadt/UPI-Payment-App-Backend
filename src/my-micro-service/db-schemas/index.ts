import adminsCollection from "./admins";
import usersCollection from "./users";
import walletsCollection from "./wallets";
import transactionsCollection from "./transactions";

export default class DBInterface {
    public admins = adminsCollection;
    public users = usersCollection;
    public wallets = walletsCollection;
    public transactions = transactionsCollection;
}
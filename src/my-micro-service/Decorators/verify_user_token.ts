import myAssert from "../helpers/Error_Handler";
const jwt = require("jsonwebtoken");



function extract_token_from_request(req: any): string {
    var token = (req.locals && req.locals.token) || req.query.token || req.body.token || req.headers["x-access-token"];
    return token;
}

export function verifyUser(accountType?: string) {
    return function (target: Object, propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
        const method = propertyDesciptor.value;

        propertyDesciptor.value = async function (...args: any[]) {
            myAssert(args && args.length > 2, "Invalid number of arguments for the request handler");
            let req = args[1];
            var token: any = await extract_token_from_request(req);
            var verifyToken: any = await jwt.verify(token,"secret101");

            
            
            myAssert(verifyToken===null, "Unauthorized");
            var user: any = verifyToken;

            if (typeof accountType !== "undefined") {
                myAssert(user.accountType !== accountType, `This is not an ${accountType} account`);
            }
            args.push(user);
            const result = await method.apply(this, args);
            return result;
        };
        return propertyDesciptor;
    };
}

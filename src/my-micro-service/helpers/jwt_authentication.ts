const jwt = require("jsonwebtoken");

function token_creation (args:any){
    let token:any = jwt.sign ( args, "secret101");

    return token;
}

export default token_creation;
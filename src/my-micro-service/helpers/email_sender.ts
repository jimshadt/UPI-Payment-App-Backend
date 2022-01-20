import * as nodemailer from "nodemailer";
import Config from "../config";

export class emailSender {
    private static server;

    private static createServer() {
        let server = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: Config.get("smtp:user"), //replace with your email
                pass: Config.get("smtp:password"), //replace with your password
            },
        });
        return server;
    }

    static send(message: any): Promise<any> {
        emailSender.server = emailSender.server || emailSender.createServer();
        let shudIgnore = typeof message.to === "string" && message.to.startsWith("noemail_");
        return shudIgnore
            ? Promise.resolve({ ignored: true })
            : new Promise((resolve, reject) => {
                  emailSender.server.sendMail(message, (err, message) => {
                      err ? reject(err) : resolve(message);
                  });
              });
    }
}

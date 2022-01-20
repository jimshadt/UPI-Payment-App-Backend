"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const config_1 = require("../config");
class emailSender {
    static createServer() {
        let server = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config_1.default.get("smtp:user"),
                pass: config_1.default.get("smtp:password"),
            },
        });
        return server;
    }
    static send(message) {
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
exports.emailSender = emailSender;

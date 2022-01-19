"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jimshaddb@gmail.com",
        pass: "Jimshad@145600",
    },
});
let mailOptions = {
    from: "jimshaddb@gmail.com",
    to: "jimshadtmelmuri@gmail.com"
};
function sendMail(message) {
    mailOptions.subject = message.subject;
    mailOptions.text = message.text;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("email error", error);
        }
    });
}
exports.default = sendMail;

import * as nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jimshaddb@gmail.com",
    pass: "Jimshad@145600",
  },
});

let mailOptions:any = {
  from: "jimshaddb@gmail.com",
  to: "jimshadtmelmuri@gmail.com"
};

function sendMail(message: any) {
  mailOptions.subject = message.subject;
  mailOptions.text = message.text;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("email error",error);
    }
  });
}
export default sendMail;

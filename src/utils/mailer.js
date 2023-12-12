import nodemailer from "nodemailer";
import config from "../../config/default.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "trantrungnguyenad@gmail.com",
        pass: "sfsn bkgd nyat dhko",
    }
})

// const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false,
//     auth: {
//         user: "alford.gaylord@ethereal.email",
//         pass: "kJ8AKDYsYxJWMSNa22",
//     }
// })

async function sendEmail(payload) {
    transporter.sendMail(payload, (err, info) => {
        if (err) {
            return err;
        }

    });
}

export default sendEmail;
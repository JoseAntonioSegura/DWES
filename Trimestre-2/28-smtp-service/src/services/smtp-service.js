import nodemailer from 'nodemailer';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

let transporter = null;

export function init() {
  const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
  };

  if (process.env.SMTP_USER) {
    smtpConfig.auth = {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    };
  }

  transporter = nodemailer.createTransport(smtpConfig);

  transporter.verify(function (error, success) {
    if (error) {
      console.error(error);
    } else {
      console.log("SMTP listo");
    }
  });
};

export async function send(mailOption) {
  let info = await transporter.sendMail({
    from: 'its@me.com',
    to: "nose@cual.es",
    subject: "Mensaje de prueba",
    text: "Este es el texto",
    html: "<h1 style='color: blue'>Este es el HTML</h1>",
  });
  console.log("Message sent: %s", info.messageId);
}


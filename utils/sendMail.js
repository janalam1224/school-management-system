import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth:{
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendMail = async({ to, subject, html }) => {
  try {
      const info = await transporter.sendMail({
        from:{
          name: "Shining Star School",
          address: process.env.SMTP_USER
        },
        to,
        subject,
        html,
      });

      console.log("Email sent:", info.messageId);

  } catch (error) {
    console.log("Error sending mail", error);
  }
}
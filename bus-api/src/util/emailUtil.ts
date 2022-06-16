import * as nodemailer from 'nodemailer';
export const sendMail = async (param: {
  title: string;
  content: string;
  receiver: string;
}) => {
  const email = process.env.EMAIL as string;
  const emailPass = process.env.EMAIL_PASS as string;
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secure: true,
    port: 465,
    auth: {
      user: email,
      pass: emailPass,
    },
  });
  await transporter.sendMail({
    to: param.receiver,
    subject: param.title,
    from: email,
    text: param.content,
  });
  transporter.close();
};

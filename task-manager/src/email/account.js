require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const sendGridApiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridApiKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Welcome to the KNOWLEDGE family",
    text: `Hello ${name}, Thank you for asking multiple questions and raising our KNOWLEDGE .`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Your account has been cancelled.",
    text: `Goodbye ${name} , Because your questions are not bearable at this point of KNOWLEDGE😎`,
  });
};
module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};

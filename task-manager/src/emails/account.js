const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lomkovsky@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app ${name}`
    });
};
const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lomkovsky@gmail.com',
        subject: 'Bye Bye User',
        text: `Goodbye mr. ${name}. We were pleased to work with you!`
    });
};
module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
};

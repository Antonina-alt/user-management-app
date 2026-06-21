const sendgrid = require('@sendgrid/mail');
const { appUrl, mail } = require('../config/env');
const { createEmailConfirmationToken } = require('../utils/token');

const isMailConfigured = () => mail.apiKey && mail.from;

const confirmationUrl = (userId) =>
    `${appUrl}/api/auth/confirm-email/${createEmailConfirmationToken(userId)}`;

const confirmationHtml = (user, url) => `
    <h2>Hello, ${user.name}!</h2>
    <p>Your account has been registered.</p>
    <p>Please confirm your e-mail by clicking the link below:</p>
    <p><a href="${url}">Confirm e-mail</a></p>
    <p>If you did not create this account, ignore this message.</p>
`;

const logConfirmationLink = (url) => {
  console.log('Confirmation e-mail is not configured.');
  console.log('Confirmation link:', url);
};

const createMessage = (user, url) => ({
  from: mail.from,
  to: user.email,
  subject: 'Confirm your e-mail',
  html: confirmationHtml(user, url),
});

const sendMessage = async (user, url) => {
  sendgrid.setApiKey(mail.apiKey);
  return sendgrid.send(createMessage(user, url));
};

const sendConfirmationEmail = async (user) => {
  const url = confirmationUrl(user.id);
  return isMailConfigured() ? sendMessage(user, url) : logConfirmationLink(url);
};

module.exports = { sendConfirmationEmail };
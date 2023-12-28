const { EmailService, EmailProvider } = require('brevo');

const emailService = new EmailService({
  provider: EmailProvider.SMTP,
  username: 'your-email@gmail.com',
  password: 'your-email-password',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
});

module.exports = emailService;

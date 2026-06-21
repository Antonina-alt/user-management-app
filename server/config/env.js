require('dotenv').config();

const env = process.env;
const number = (value, fallback) => Number(value) || fallback;
const fallbackPort = () => number(env.PORT, 5000);

module.exports = {
  port: fallbackPort(),
  appUrl: env.APP_URL || `http://localhost:${fallbackPort()}`,
  clientUrl: env.CLIENT_URL || 'http://localhost:5173',
  jwtSecret: env.JWT_SECRET,
  emailConfirmationSecret: env.EMAIL_CONFIRMATION_SECRET || env.JWT_SECRET,
  nodeEnv: env.NODE_ENV || 'development',

  mail: {
    apiKey: env.SENDGRID_API_KEY,
    fromName: env.MAIL_FROM_NAME || 'User Manager App',
    fromEmail: env.MAIL_FROM_EMAIL,
  },

  db: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: number(env.DB_PORT, 5432),
  },
};

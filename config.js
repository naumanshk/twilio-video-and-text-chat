require('dotenv').config();
module.exports = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY_SID,
    apiSecret: process.env.TWILIO_API_KEY_SECRET,
    TWILIO_CHAT_SERVICE_SID:'IS270aa940df57408f9e9d55672dd0b7fa',

  }
};

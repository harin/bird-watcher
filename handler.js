const fetch = require('node-fetch');
const mailgun = require('mailgun-js');

const RESULT_URL = process.env.BIRD_RESULT_URL;
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const TO_EMAIL = process.env.TO_EMAIL;

const mg = mailgun({
  apiKey: MAILGUN_API_KEY,
  domain: 'whatever'
})


const generateResponse = (body, statusCode) => {
  return {
      headers: {
          "access-control-allow-methods": "POST",
          "access-control-allow-origin": "*",
          "content-type": "application/json"
      },
      statusCode: statusCode,
      body: `{\"result\": ${body.message}}`
  };
};

const sendEmail = data => {
  const { from, to, subject, text } = data;
  const email = { from, to, subject, text };

  return mg.messages().send(email);
};

module.exports.get_bird_internships = async (event, context) => {
  const resp = await fetch(RESULT_URL);
  const json = await resp.json();

  var body;
  try {
    body = json[0].pageFunctionResult;
  } catch (err) {
    body = err.toString();
  }

  sendEmail({ 
    from: FROM_EMAIL, 
    to: TO_EMAIL,
    text: JSON.stringify(body)
  })
  
  return {
    statusCode: 200,
    body
  };
};

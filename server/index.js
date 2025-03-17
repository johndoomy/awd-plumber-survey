require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const SurveyResponse = require('./schema/SurveyResponse');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());

const URI = process.env.URI;

mongoose.connect(URI);

const handleSurveyResponse = async (body) => {
  try {
    const surveyResponse = await SurveyResponse.create({
      firstName: body.firstName,
      lastName: body.lastName,
      company: body.company,
      phoneNumber: body.phoneNumber,
      email: body.email,
      waterDamageCompany: body.waterDamageCompany,
      why: body.why,
    });

    return surveyResponse;
  } catch (error) {
    console.log(error.message);
  }
};

const recipient = process.env.RECIPIENTEMAIL;

const userName = process.env.USERNAME;
const userPass = process.env.USERPASS;
const mailService = process.env.MAILSERVICE;

const transporter = nodemailer.createTransport({
  service: mailService,
  auth: {
    user: userName,
    pass: userPass,
  },
});

const sendEmail = (options, res) => {
  transporter.sendMail(options, (error, info) => {
    if (error) {
      res.send(error);
    } else {
      console.log('email sent');
      res.send('submition received');
    }
  });
};

const parseWhyObject = (obj) => {
  const reasons = [];
  let htmlString = '<ul>';

  for (item in obj) {
    if (item === 'payoutAmount' && obj[item]) {
      reasons.push(`Payout Amount`);
    }
    if (item === 'fastResponseTime' && obj[item]) {
      reasons.push(`Fast Payout Time`);
    }
    if (item === 'allDayService' && obj[item]) {
      reasons.push(`24/7 Service`);
    }
    if (item === 'companyMandated' && obj[item]) {
      reasons.push(`Company Mandated`);
    }
    if (item === 'other' && obj[item]) {
      reasons.push(`Other: ${obj.other}`);
    }
  }

  reasons.forEach((element) => {
    htmlString += `<li>${element}</li>`;
  });

  htmlString += '</ul>';

  return htmlString;
};

app.post('/survey', (req, res) => {
  const {
    firstName,
    lastName,
    company,
    phoneNumber,
    email,
    waterDamageCompany,
    why,
  } = req.body;

  handleSurveyResponse(req.body);
  // console.log(newSurveyResponse);

  const mailOptions = {
    from: 'awd.marketing.test@gmail.com',
    to: recipient,
    subject: `Plumber Survey Response - ${firstName} ${lastName}`,
    html: `<p>Please see the survey respone below:</p>
    <p></p>
    <p>Name: ${firstName} ${lastName}</p>
    <p>Company: ${company}</p>
    <p>Phone Number: ${phoneNumber}</p>
    <p>Email: ${email}</p>
    <p>Water damage company of choice: ${waterDamageCompany}</p>
    <p>Why: ${parseWhyObject(why)}</p>`,
  };

  sendEmail(mailOptions, res);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

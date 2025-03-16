const mongoose = require('mongoose');

const surveyResponseSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  company: String,
  phoneNumber: String,
  email: String,
  waterDamageCompany: String,
  why: Object,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model('surveyResponse', surveyResponseSchema);

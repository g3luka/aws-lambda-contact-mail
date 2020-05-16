const axios = require('axios')
const FormData = require('form-data')

const errorMessages = require('./errorMessages.json')

const minimumScore = process.env.RECAPTCHA_MINIMUM_SCORE || 0.5

module.exports = {

  verify: async (gRecaptchaResponse, secretKey) => {
    try {

      const form = new FormData()
      form.append('response', gRecaptchaResponse)
      form.append('secret', secretKey)

      const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', form, {
        headers: {
          ...form.getHeaders(),
          "Content-Length": form.getLengthSync()
        }
      })

      if ( ! response.data.success) throw response.data
      return response.data

    } catch(error) {
      throw {
        success: false,
        message: `reCaptcha: ${errorMessages[error['error-codes']]}`
      };
    }
  },

  scoreChallenge: (data) => {
    try {

      if (data.score < minimumScore) throw { 'error-codes': ['low-score'], success: false }
      return data

    } catch(error) {
      throw {
        success: false,
        message: `reCaptcha: ${errorMessages[error['error-codes']]}`
      };
    }
  }

}

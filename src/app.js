const qs = require('querystring')

const { prepareResponse, prepareErrorResponse } = require('./responses')
const validation = require('./validation')
const recaptcha = require('./recaptcha')
const mail = require('./mail')

const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY

exports.handler = async (event, context, callback) => {

  try {

    const data = qs.parse(event.body)
    console.log(JSON.stringify(data))

    await validation(data)
    const recaptchaResponse = await recaptcha.verify(data['g-recaptcha-response'], recaptchaSecretKey)
    recaptcha.scoreChallenge(recaptchaResponse)
    await mail(data)

    return prepareResponse("Mensagem enviada com sucesso")

  } catch (error) {
    // console.log(error)
    return prepareErrorResponse(error.message, error.status, error.code)
  }

}

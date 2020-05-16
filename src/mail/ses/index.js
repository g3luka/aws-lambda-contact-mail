const AWS = require('aws-sdk')
const config = require('../../config.json')
const errorMessages = require('./errorMessages.json')

const client = new AWS.SES({region: process.env.AWS_REGION || 'us-east-1'})

module.exports = async (content) => {

  try {

    const emailParams = {
      "Destination": {
        "ToAddresses": config.sendMailsTo
      },
      "Message": {
        "Body": {
          "Html": {
            "Charset": "UTF-8",
            "Data": content.body
          }
        },
        "Subject": {
          "Data": content.subject
        }
      },
      "Source": process.env.SES_SOURCE_MAIL
    };
    await client.sendEmail(emailParams).promise()

  } catch (error) {
    // console.error(error)
    throw {
      success: false,
      status: error.code,
      code: error.statusCode,
      message: `AWS.SES: ${errorMessages[error.code]}`
    };
  }

}

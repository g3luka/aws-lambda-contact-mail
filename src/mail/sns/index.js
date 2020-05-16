const AWS = require('aws-sdk')
const errorMessages = require('./errorMessages.json')

const client = new AWS.SNS({region: process.env.AWS_REGION || 'us-east-1'})

module.exports = async (mail) => {

  try {

    await client.publish({
      TopicArn: process.env.SNS_MAIL_TOPIC_ARN,
      Message: mail.body
    }).promise()

  } catch (error) {
    // console.error(error)
    throw {
      success: false,
      status: error.code,
      code: error.statusCode,
      message: `AWS.SNS: ${errorMessages[error.code]}`
    };
  }

}

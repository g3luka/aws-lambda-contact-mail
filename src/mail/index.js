const mailContent = require('./content')
const ses = require('./ses')

module.exports = async (data) => {

  try {

    const content = mailContent(data)
    await ses(content)
    return true

  } catch (error) {
    throw error
  }

}

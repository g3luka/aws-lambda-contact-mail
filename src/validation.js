const errorMessages = require('./errorMessages.json')

module.exports = (data) => {

  try {

    Object.keys(errorMessages).map((field) => {
      if ( ! data[field]) throw field
    })

  } catch (error) {
    // console.error(error)
    throw {
      success: false,
      // status: error.code,
      // code: error.statusCode,
      message: `Validation: ${errorMessages[error]}`
    }
  }

}

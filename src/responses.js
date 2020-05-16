module.exports = {

  // Function to prepare a standard response structure
  prepareResponse: (message) => {
    return {
      "statusCode": 200,
      "headers": {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : false // Required for cookies, authorization headers with HTTPS
      },
      "body": JSON.stringify({ "message": message })
    }
  },

  prepareErrorResponse: (message, error, code) => {
    return {
      "statusCode": code || 500,
      "headers": {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : false // Required for cookies, authorization headers with HTTPS
      },
      "body": JSON.stringify({ "message": message, "error": error })
    }
  }

}
